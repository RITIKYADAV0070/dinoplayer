import { getRelatedVideos, type Video } from "@/data/videos";
import { usePlayer } from "@/contexts/PlayerContext";

interface RelatedVideoListProps {
  categorySlug: string;
  currentVideoId: string;
}

export const RelatedVideoList = ({ categorySlug, currentVideoId }: RelatedVideoListProps) => {
  const { playVideo } = usePlayer();
  const related = getRelatedVideos(categorySlug, currentVideoId);

  if (related.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Up Next
      </h3>
      {related.map((video) => (
        <RelatedVideoItem key={video.id} video={video} onSelect={playVideo} />
      ))}
    </div>
  );
};

const RelatedVideoItem = ({
  video,
  onSelect,
}: {
  video: Video;
  onSelect: (video: Video) => void;
}) => {
  return (
    <div
      onClick={() => onSelect(video)}
      className="flex gap-3 cursor-pointer group rounded-lg p-1.5 -mx-1.5 hover:bg-accent/50 transition-colors"
    >
      <div className="w-[140px] flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-card">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <h4 className="text-sm font-medium line-clamp-2 text-foreground group-hover:text-primary transition-colors leading-snug">
          {video.title}
        </h4>
        <span className="text-[11px] text-muted-foreground mt-1.5 block">
          {video.category}
        </span>
      </div>
    </div>
  );
};
