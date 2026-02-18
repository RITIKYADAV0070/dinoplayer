import React, { createContext, useContext, useState, useCallback } from "react";
import type { Video } from "@/data/videos";

interface PlayerState {
  currentVideo: Video | null;
  isMinimized: boolean;
  playVideo: (video: Video) => void;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

const PlayerContext = createContext<PlayerState | null>(null);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const playVideo = useCallback((video: Video) => {
    setCurrentVideo(video);
    setIsMinimized(false);
  }, []);

  const minimize = useCallback(() => setIsMinimized(true), []);
  const maximize = useCallback(() => setIsMinimized(false), []);

  const close = useCallback(() => {
    setCurrentVideo(null);
    setIsMinimized(false);
  }, []);

  return (
    <PlayerContext.Provider value={{ currentVideo, isMinimized, playVideo, minimize, maximize, close }}>
      {children}
    </PlayerContext.Provider>
  );
};
