import { usePlayer } from "@/contexts/PlayerContext";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { VideoControls } from "./VideoControls";
import { RelatedVideoList } from "./RelatedVideoList";
import { getNextVideo } from "@/data/videos";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import { Play, Pause, X, ChevronDown } from "lucide-react";

const PLAYER_CONTAINER_ID = "yt-player-container";

export const PlayerOverlay = () => {
  const {
    currentVideo,
    isMinimized,
    minimize,
    maximize,
    close,
    playVideo,
  } = usePlayer();

  const {
    currentTime,
    duration,
    playing,
    ended,
    play,
    pause,
    seekTo,
    skip,
  } = useYouTubePlayer(PLAYER_CONTAINER_ID, currentVideo?.youtubeId ?? "", !isMinimized);

  const [showControls, setShowControls] = useState(true);
  const controlsTimer = useRef<ReturnType<typeof setTimeout>>();
  const [autoPlayCountdown, setAutoPlayCountdown] = useState<number | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setTimeout>>();
  const [dragY, setDragY] = useState(0);

  // Auto-hide controls
  const resetControlsTimer = useCallback(() => {
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    setShowControls(true);
    controlsTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  }, [playing]);

  useEffect(() => {
    if (!isMinimized && playing) resetControlsTimer();
    return () => { if (controlsTimer.current) clearTimeout(controlsTimer.current); };
  }, [playing, isMinimized, resetControlsTimer]);

  // Handle video end -> auto-play next
  useEffect(() => {
    if (!ended || !currentVideo) return;
    const next = getNextVideo(currentVideo);
    if (next) {
      setAutoPlayCountdown(3);
      let count = 3;
      const tick = () => {
        count--;
        if (count <= 0) {
          setAutoPlayCountdown(null);
          playVideo(next);
        } else {
          setAutoPlayCountdown(count);
          countdownTimer.current = setTimeout(tick, 1000);
        }
      };
      countdownTimer.current = setTimeout(tick, 1000);
    }
  }, [ended, currentVideo, playVideo]);

  useEffect(() => {
    return () => { if (countdownTimer.current) clearTimeout(countdownTimer.current); };
  }, [currentVideo]);

  const cancelAutoPlay = useCallback(() => {
    if (countdownTimer.current) clearTimeout(countdownTimer.current);
    setAutoPlayCountdown(null);
  }, []);

  const toggleControlsVisibility = useCallback(() => {
    if (showControls) {
      setShowControls(false);
      if (controlsTimer.current) clearTimeout(controlsTimer.current);
    } else {
      resetControlsTimer();
    }
  }, [showControls, resetControlsTimer]);

  const togglePlay = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  if (!currentVideo) return null;

  return (
    <>
      {/* Full player */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-2 flex-shrink-0">
              <button onClick={minimize} className="p-1.5 rounded-full hover:bg-accent transition-colors text-muted-foreground">
                <ChevronDown size={22} />
              </button>
              <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
              <button onClick={close} className="p-1.5 rounded-full hover:bg-accent transition-colors text-muted-foreground">
                <X size={22} />
              </button>
            </div>

            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.3}
              onDrag={(_, info) => setDragY(info.offset.y)}
              onDragEnd={(_, info) => { setDragY(0); if (info.offset.y > 120) minimize(); }}
              style={{ opacity: 1 - Math.max(0, dragY) / 500 }}
              className="flex-shrink-0"
            >
              <div className="aspect-video bg-black relative mx-auto w-full max-w-[900px]" onClick={toggleControlsVisibility}>
                {/* YouTube player renders here */}
                <div id={PLAYER_CONTAINER_ID} className="absolute inset-0 w-full h-full" />

                <VideoControls
                  show={showControls}
                  isPlaying={playing}
                  progress={currentTime}
                  duration={duration}
                  onTogglePlay={togglePlay}
                  onSeek={seekTo}
                  onSkip={skip}
                />

                <AnimatePresence>
                  {autoPlayCountdown !== null && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
                      <p className="text-primary-foreground text-sm mb-2">Next video in</p>
                      <span className="text-5xl font-bold text-primary">{autoPlayCountdown}</span>
                      <button onClick={cancelAutoPlay} className="mt-4 px-4 py-2 text-sm border border-primary-foreground/30 rounded-full text-primary-foreground hover:bg-primary-foreground/10 transition-colors">Cancel</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="px-4 py-3 max-w-[900px] mx-auto w-full">
                <h2 className="text-lg font-bold text-foreground leading-snug">{currentVideo.title}</h2>
                <span className="inline-block mt-2 text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">{currentVideo.category}</span>
              </div>
              <div className="px-4 pb-6 max-w-[900px] mx-auto w-full">
                <div className="h-px bg-border my-4" />
                <RelatedVideoList categorySlug={currentVideo.categorySlug} currentVideoId={currentVideo.id} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini player */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <div className="h-[2px] bg-muted">
              <div className="h-full bg-primary transition-[width] duration-200" style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }} />
            </div>
            <div className="bg-card flex items-center h-[64px] px-3 gap-3 cursor-pointer" onClick={maximize}>
              <div className="w-[100px] h-[56px] flex-shrink-0 rounded-md overflow-hidden bg-muted">
                <img src={currentVideo.thumbnailUrl} alt={currentVideo.title} className="w-full h-full object-cover" />
              </div>
              <p className="flex-1 text-sm font-medium line-clamp-1 text-foreground min-w-0">{currentVideo.title}</p>
              <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="p-2.5 text-foreground hover:text-primary transition-colors flex-shrink-0">
                {playing ? <Pause size={22} /> : <Play size={22} fill="currentColor" />}
              </button>
              <button onClick={(e) => { e.stopPropagation(); close(); }} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
