import { categories } from "@/data/videos";
import { VideoCard } from "@/components/VideoCard";
import { usePlayer } from "@/contexts/PlayerContext";
import { useState } from "react";

const Index = () => {
  const { isMinimized } = usePlayer();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = activeCategory
    ? categories.filter((c) => c.slug === activeCategory)
    : categories;

  return (
    <div className={`min-h-screen bg-background ${isMinimized ? "pb-[80px]" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-[900px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-black text-sm">▶</span>
            </div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Dino Player</h1>
          </div>
        </div>

        {/* Category tabs */}
        <div className="max-w-[900px] mx-auto px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === null
                  ? "bg-foreground text-background"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug === activeCategory ? null : cat.slug)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.slug
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                <img src={cat.iconUrl} alt="" className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Video feed */}
      <main className="max-w-[900px] mx-auto px-4 py-4">
        {filteredCategories.map((cat) => (
          <section key={cat.slug} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <img src={cat.iconUrl} alt="" className="w-5 h-5" />
              <h2 className="text-base font-bold text-foreground">{cat.name}</h2>
              <span className="text-xs text-muted-foreground">
                {cat.videos.length} videos
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {cat.videos.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Index;
