import { useRef, useEffect, useCallback, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

let apiLoaded = false;
let apiReady = false;
const readyCallbacks: (() => void)[] = [];

function loadYouTubeAPI() {
  if (apiLoaded) return;
  apiLoaded = true;
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
  window.onYouTubeIframeAPIReady = () => {
    apiReady = true;
    readyCallbacks.forEach((cb) => cb());
    readyCallbacks.length = 0;
  };
}

function onAPIReady(cb: () => void) {
  if (apiReady) {
    cb();
  } else {
    readyCallbacks.push(cb);
    loadYouTubeAPI();
  }
}

export function useYouTubePlayer(containerId: string, videoId: string, autoPlay: boolean) {
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  // Progress polling
  const startPolling = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
      if (playerRef.current?.getDuration) {
        const d = playerRef.current.getDuration();
        if (d > 0) setDuration(d);
      }
    }, 250);
  }, []);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Create / replace player
  useEffect(() => {
    if (!videoId) return;

    const create = () => {
      // Destroy previous
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setIsReady(false);
      setEnded(false);

      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setIsReady(true);
            if (playerRef.current?.getDuration) {
              setDuration(playerRef.current.getDuration());
            }
          },
          onStateChange: (e: any) => {
            // -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
            if (e.data === 1) {
              setPlaying(true);
              setEnded(false);
              startPolling();
            } else if (e.data === 2) {
              setPlaying(false);
              stopPolling();
            } else if (e.data === 0) {
              setPlaying(false);
              setEnded(true);
              stopPolling();
            }
          },
        },
      });
    };

    onAPIReady(create);

    return () => {
      stopPolling();
    };
  }, [videoId, containerId, autoPlay, startPolling, stopPolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [stopPolling]);

  const play = useCallback(() => {
    playerRef.current?.playVideo?.();
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo?.();
  }, []);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo?.(seconds, true);
    setCurrentTime(seconds);
  }, []);

  const skip = useCallback(
    (seconds: number) => {
      const cur = playerRef.current?.getCurrentTime?.() ?? currentTime;
      const dur = playerRef.current?.getDuration?.() ?? duration;
      const newTime = Math.max(0, Math.min(cur + seconds, dur));
      seekTo(newTime);
    },
    [currentTime, duration, seekTo]
  );

  return { isReady, currentTime, duration, playing, ended, play, pause, seekTo, skip };
}
