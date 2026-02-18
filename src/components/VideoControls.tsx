import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback } from "react";

interface VideoControlsProps {
  show: boolean;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onSkip: (seconds: number) => void;
}

const formatTime = (secs: number) => {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const VideoControls = ({
  show,
  isPlaying,
  progress,
  duration,
  onTogglePlay,
  onSeek,
  onSkip,
}: VideoControlsProps) => {
  const [skipAnim, setSkipAnim] = useState<"back" | "forward" | null>(null);

  const handleSkip = useCallback(
    (dir: "back" | "forward") => {
      setSkipAnim(dir);
      onSkip(dir === "forward" ? 10 : -10);
      setTimeout(() => setSkipAnim(null), 500);
    },
    [onSkip]
  );

  const handleSeekClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const fraction = (e.clientX - rect.left) / rect.width;
      onSeek(Math.max(0, Math.min(duration, fraction * duration)));
    },
    [onSeek, duration]
  );

  const handleSeekTouch = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      const fraction = (touch.clientX - rect.left) / rect.width;
      onSeek(Math.max(0, Math.min(duration, fraction * duration)));
    },
    [onSeek, duration]
  );

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 flex flex-col justify-between z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Center controls */}
          <div className="flex-1 flex items-center justify-center gap-10">
            <button
              onClick={() => handleSkip("back")}
              className="relative flex flex-col items-center text-primary-foreground/80 hover:text-primary-foreground active:scale-90 transition-all p-2"
            >
              <SkipBack size={30} />
              <span className="text-[10px] font-bold mt-0.5">10</span>
              {skipAnim === "back" && (
                <motion.span
                  className="absolute -left-2 top-0 text-primary-foreground text-xs font-bold"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: [0, 1, 0], x: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  -10s
                </motion.span>
              )}
            </button>

            <button
              onClick={onTogglePlay}
              className="bg-primary-foreground/20 backdrop-blur-sm rounded-full p-4 text-primary-foreground hover:bg-primary-foreground/30 active:scale-90 transition-all"
            >
              {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" />}
            </button>

            <button
              onClick={() => handleSkip("forward")}
              className="relative flex flex-col items-center text-primary-foreground/80 hover:text-primary-foreground active:scale-90 transition-all p-2"
            >
              <SkipForward size={30} />
              <span className="text-[10px] font-bold mt-0.5">10</span>
              {skipAnim === "forward" && (
                <motion.span
                  className="absolute -right-2 top-0 text-primary-foreground text-xs font-bold"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: [0, 1, 0], x: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  +10s
                </motion.span>
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div className="px-4 pb-4">
            <div
              className="relative h-1.5 bg-primary-foreground/20 rounded-full cursor-pointer group/seek"
              onClick={handleSeekClick}
              onTouchMove={handleSeekTouch}
            >
              {/* Buffered (fake) */}
              <div
                className="absolute h-full bg-primary-foreground/15 rounded-full"
                style={{ width: `${Math.min(progressPercent + 15, 100)}%` }}
              />
              {/* Played */}
              <div
                className="absolute h-full bg-primary rounded-full transition-[width] duration-100"
                style={{ width: `${progressPercent}%` }}
              />
              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-primary rounded-full shadow-lg opacity-0 group-hover/seek:opacity-100 transition-opacity -ml-1.5"
                style={{ left: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-primary-foreground/60 mt-1.5 font-medium">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
