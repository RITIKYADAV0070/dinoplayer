import type { Video } from "@/data/videos";
import { usePlayer } from "@/contexts/PlayerContext";

export const VideoCard = ({ video, index = 0 }: { video: Video; index?: number }) => {
  const { playVideo } = usePlayer();

  return (
    <div
      onClick={() => playVideo(video)}
      className="cursor-pointer group animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-card">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="mt-2.5 px-0.5">
        <h3 className="text-sm font-medium leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <span className="inline-block mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
          {video.category}
        </span>
      </div>
    </div>
  );
};
