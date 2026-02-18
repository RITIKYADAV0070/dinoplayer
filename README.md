# 🎬 Dino Player -- Mobile-First Video Application

A high-performance, gesture-driven video player inspired by the YouTube
mobile experience.

Built as part of the **Dino Ventures -- Frontend Engineer Assignment**.

🌍 **Live Demo:**\
https://dinoplayer.vercel.app/

------------------------------------------------------------------------

## 🚀 Overview

Dino Player is a mobile-first video streaming interface designed with a
strong focus on:

-   Smooth playback experience\
-   Gesture-based interactions\
-   Clean, immersive UI\
-   High performance rendering\
-   Seamless state management

The application integrates the official **YouTube IFrame Player API**
for reliable playback control and advanced features like seeking and
auto-play.

------------------------------------------------------------------------

## ✨ Core Features

### 🏠 Home Feed

-   Scrollable video grid
-   Category filter tabs
-   Responsive layout (2 columns mobile / 4 columns desktop)
-   Thumbnail previews
-   Category badges
-   Dark cinematic theme

### ▶️ Full-Screen Player

-   Smooth slide-up transition
-   Custom overlay controls
-   Play / Pause
-   Seekable progress bar
-   Real-time time tracking
-   Minimal clean UI

### ⏩ Skip Controls (±10 Seconds)

-   +10 seconds forward
-   -10 seconds backward
-   Implemented using official `YT.Player` API
-   Reliable `seekTo()` control
-   Progress polling at 250ms intervals

### 🧲 Drag-to-Minimize Mini Player

-   Drag down gesture
-   Persistent docked mini-player
-   Thumbnail + title
-   Play / Pause
-   Close button
-   Tap to restore full-screen
-   Framer Motion spring animations

### ⏭ Auto-Play Next

-   3-second countdown
-   Cancel option
-   Automatic playback of next related video

------------------------------------------------------------------------

## 🧠 Architecture & Structure

    public/
      ├── placeholder.svg
      ├── robots.txt

    src/
      ├── components/     → UI components
      ├── contexts/       → Global player state management
      ├── data/           → Static video dataset
      ├── hook/           → Custom hooks (YouTube player logic)
      ├── lib/            → Utility functions
      ├── pages/          → Page-level components
      ├── test/           → Testing utilities
      ├── App.tsx
      ├── main.tsx

### Key Architectural Decisions

-   Centralized Player Context for global playback state
-   Custom `useYouTubePlayer` hook for controlled API interaction
-   Controlled rendering to prevent unnecessary re-renders
-   Framer Motion for gesture & animation handling
-   Clear separation of UI, logic, and data layers

------------------------------------------------------------------------

## 🎨 Design System

-   Dark cinematic theme (#111 base)
-   Red accent color
-   Tailwind utility-first styling
-   shadcn-ui components
-   Mobile-first responsive approach
-   Smooth spring-based transitions

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Vite
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn-ui
-   Framer Motion
-   YouTube IFrame Player API

------------------------------------------------------------------------

## 📦 Local Setup

### 1️⃣ Clone Repository
```
git clone https://github.com/RITIKYADAV0070/dinoplayer.git\
cd dinoplayer
``
### 2️⃣ Install Dependencies
```
npm install
``
### 3️⃣ Run Dev Server
```
npm run dev
``
App runs at: http://localhost:5173

------------------------------------------------------------------------

## 🌍 Deployment

Deployed on Vercel\
Live URL: https://dinoplayer.vercel.app/

------------------------------------------------------------------------

## 📌 Assignment Context

This application was built as part of the **Dino Ventures -- Frontend
Engineer assignment**, with emphasis on:

-   UX polish
-   Performance optimization
-   Reliable playback control
-   Gesture fluidity
-   Clean frontend architecture

------------------------------------------------------------------------

## 👨‍💻 Author

**Ritik Yadav**\
Frontend Engineer \| React \| TypeScript

GitHub: https://github.com/RITIKYADAV0070\
LinkedIn: https://www.linkedin.com/in/ritik-yadav-a43167232/
