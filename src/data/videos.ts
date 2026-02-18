export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  youtubeId: string;
  category: string;
  categorySlug: string;
}

export interface Category {
  slug: string;
  name: string;
  iconUrl: string;
  videos: Video[];
}

let idCounter = 0;
const makeId = () => String(++idCounter);

export const categories: Category[] = [
  {
    slug: "social-media-ai",
    name: "Social Media AI",
    iconUrl: "https://media.samajsaathi.com/icons/learn-ai/04-social-media-ai.png",
    videos: [
      { id: makeId(), title: "AI Motivational Reel Banao Free Mein", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b29/TC9Jbr_MBNoEJm5Mwhc2F.png", youtubeId: "_HL7l_62bUc", category: "Social Media AI", categorySlug: "social-media-ai" },
      { id: makeId(), title: "Social Media Ke Liye Facts Video Banao", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b28/7hy7WSculPFwQtcVu0BzN.png", youtubeId: "avZd1bSvqyE", category: "Social Media AI", categorySlug: "social-media-ai" },
      { id: makeId(), title: "Instagram Ka Naya AI Feature", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b2a/T6DpgH_xrEN15r1f3rqu-.png", youtubeId: "meVTqNn1P5A", category: "Social Media AI", categorySlug: "social-media-ai" },
      { id: makeId(), title: "Ab Meta AI Karega Aapki Photo Edit", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b29/Joql9g8WnlzhXj5sDCfN5.png", youtubeId: "x3LsfGSP-Hk", category: "Social Media AI", categorySlug: "social-media-ai" },
      { id: makeId(), title: "AI Se Reel Banaye 1 Minute Mein", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b29/F5qaMZqTNvp4Z9KmprqEV.png", youtubeId: "lfDxSj9xnmI", category: "Social Media AI", categorySlug: "social-media-ai" },
      { id: makeId(), title: "Instagram AI Character Kaise Banaye", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b28/r_1g2P1AnedS4SSN89vwG.png", youtubeId: "LX598gRezv4", category: "Social Media AI", categorySlug: "social-media-ai" },
      { id: makeId(), title: "Trending 3D AI Photo Kaise Banaye", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b28/rKMuPZJCl1S9wIpP-knMt.png", youtubeId: "BDN_N-mAbkU", category: "Social Media AI", categorySlug: "social-media-ai" },
      { id: makeId(), title: "Social Media Content Ke Liye Best AI Tools", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b29/M-Gw4R2hoRC29el9zQ-uI.png", youtubeId: "ogAG6GcmHjQ", category: "Social Media AI", categorySlug: "social-media-ai" },
      { id: makeId(), title: "AI Tools Se Asani Se Content Creator Bano", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b29/9kGHRX9Gj9OcEJwBuVDt1.png", youtubeId: "mobK-kGDxWo", category: "Social Media AI", categorySlug: "social-media-ai" },
      { id: makeId(), title: "AI Ki Madad Se Faceless Videos Banao", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b28/y9MpZDuI2z1kZV_mNA2Qd.png", youtubeId: "6ZqxfloJ3Vk", category: "Social Media AI", categorySlug: "social-media-ai" },
    ],
  },
  {
    slug: "ai-income",
    name: "AI Income",
    iconUrl: "https://media.samajsaathi.com/icons/learn-ai/05-ai-income.png",
    videos: [
      { id: makeId(), title: "Yeh Free AI Tool Se Paise Kamao", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b2e/SK5TdlG5x5Tc-KG29U_Jm.png", youtubeId: "TpW3QxwADgE", category: "AI Income", categorySlug: "ai-income" },
      { id: makeId(), title: "AI Clone Se Paise Kamao", thumbnailUrl: "https://v3b.fal.media/files/b/0a883ea8/MuPkcktStazw3ImTOJGIm.png", youtubeId: "Wi9cKN6Fg1E", category: "AI Income", categorySlug: "ai-income" },
      { id: makeId(), title: "Pictory AI Se Youtube Side Income Bann Sakta Hai?", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b2f/uOV2zrTv8yrsXW3v5nKX2.png", youtubeId: "mkGhOo_oB4o", category: "AI Income", categorySlug: "ai-income" },
      { id: makeId(), title: "DesiVocal Se Bharpur Paise Kamao", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b2e/MBiZLEvaN7FdmVqUDZcJR.png", youtubeId: "k-aVj_Geyvc", category: "AI Income", categorySlug: "ai-income" },
      { id: makeId(), title: "AI Se WordPress Plugin Banakar Paise Kamao", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b2f/RWn-4G0cCcDogRcsUuZHY.png", youtubeId: "gUDRMsW3v1U", category: "AI Income", categorySlug: "ai-income" },
      { id: makeId(), title: "Quick Money AI Se Kamao", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b2e/owJQOWUFlWuxa7HZuageT.png", youtubeId: "I93GvazYTuc", category: "AI Income", categorySlug: "ai-income" },
      { id: makeId(), title: "AI Hindi Story Se Youtube Pe Paise Kamao", thumbnailUrl: "https://v3b.fal.media/files/b/0a883f60/F8LDntc6q7xMdyJfjC17W.png", youtubeId: "ibI3RRJN0Wg", category: "AI Income", categorySlug: "ai-income" },
      { id: makeId(), title: "Kya Hum AI Se Active Income Bana Sakta Hai?", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b2e/B7yW2SjAclyMReSqcYSfM.png", youtubeId: "TPtAAW3LSP4", category: "AI Income", categorySlug: "ai-income" },
      { id: makeId(), title: "Fiverr Par AI Se Paise Kamao", thumbnailUrl: "https://v3b.fal.media/files/b/0a883ea7/LOY5sDu5YgN2GaPpJXg5J.png", youtubeId: "JrbFF30SHzc", category: "AI Income", categorySlug: "ai-income" },
      { id: makeId(), title: "AI Tool Se Side Business Shuru Karo!", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b2e/GuuKXPXsea-n1IM1VW6jt.png", youtubeId: "VKpgO2FVXa0", category: "AI Income", categorySlug: "ai-income" },
    ],
  },
  {
    slug: "ai-essentials",
    name: "AI Essentials",
    iconUrl: "https://media.samajsaathi.com/icons/learn-ai/07-ai-essentials.png",
    videos: [
      { id: makeId(), title: "50 Lakh Ki AI Course Bilkul Free!", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b39/BhkweJb1D0L7oiuL4XdSo.png", youtubeId: "DzCWyUCr9LQ", category: "AI Essentials", categorySlug: "ai-essentials" },
      { id: makeId(), title: "Google Ka AI Course 100% Free", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b3a/3rE_mrJr2af5XMJxEXuV_.png", youtubeId: "kmHt5BHXYvU", category: "AI Essentials", categorySlug: "ai-essentials" },
      { id: makeId(), title: "Nvidia Ka Free Generative AI Course", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b3a/oD30ARDLlEDQxinlqQvwZ.png", youtubeId: "_w07HdQxuIw", category: "AI Essentials", categorySlug: "ai-essentials" },
      { id: makeId(), title: "Data Annotation Projects WFH Ke Liye", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b3a/36455BIBrDfyDFwJBbyzh.png", youtubeId: "ua-NkDcLneo", category: "AI Essentials", categorySlug: "ai-essentials" },
      { id: makeId(), title: "5 Best Free AI Skills Courses", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b39/U9h2KU6HwQ1BX45INCy0y.png", youtubeId: "sAz94JQ6v4w", category: "AI Essentials", categorySlug: "ai-essentials" },
      { id: makeId(), title: "Indian Government Ka AI Course", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b39/zBWHk56rKEmLqmbWXN9N6.png", youtubeId: "5kQdqXsmnBc", category: "AI Essentials", categorySlug: "ai-essentials" },
      { id: makeId(), title: "Lakhon Kamao Yeh Course Karke", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b39/ZHWjXBXcErWgNiR2fz2na.png", youtubeId: "IoslCQQ4lcE", category: "AI Essentials", categorySlug: "ai-essentials" },
      { id: makeId(), title: "Crowdgen Platform Ka AI Training Jobs", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b3a/O9KNgQYUNIXrTjvwZWEmE.png", youtubeId: "SxtDXU_rM1s", category: "AI Essentials", categorySlug: "ai-essentials" },
      { id: makeId(), title: "EY Aur Microsoft Ka Free AI Course", thumbnailUrl: "https://v3b.fal.media/files/b/0a877b3a/o4DNA97xHC1BixuETJS_J.png", youtubeId: "gcOFJSc-lWs", category: "AI Essentials", categorySlug: "ai-essentials" },
    ],
  },
];

export const allVideos: Video[] = categories.flatMap((c) => c.videos);

export const getRelatedVideos = (categorySlug: string, currentId: string): Video[] =>
  allVideos.filter((v) => v.categorySlug === categorySlug && v.id !== currentId);

export const getNextVideo = (currentVideo: Video): Video | null => {
  const categoryVideos = allVideos.filter((v) => v.categorySlug === currentVideo.categorySlug);
  const currentIndex = categoryVideos.findIndex((v) => v.id === currentVideo.id);
  if (currentIndex < categoryVideos.length - 1) return categoryVideos[currentIndex + 1];
  return null;
};
