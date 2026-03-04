# Task 6 — Multi‑Page Admin Dashboard (React + React Router + Chart.js + Three.js)

## Introduction
This is **Task 6** of my **Elevvo Front-End Web Development Tasks** series.  
It’s a **multi-page admin dashboard** for a fictional freelance client, built with **React** and **React Router**. The app includes a consistent **sidebar + top header layout**, smooth page switching without refresh, and dashboard visuals like a **Chart.js monthly earnings bar chart** and subtle **Three.js** scenes for a modern feel.


## Key Features / Functions
### 1) Multi‑Page Routing (No Refresh)
- Client-side routing using **React Router DOM**:
  - `/overview` (dashboard summary)
  - `/projects` (projects list + filters)
- Default route redirects from `/` → `/overview`
- Unknown routes redirect back to `/overview`

### 2) Shared Dashboard Layout (Sidebar + Top Header)
- A reusable `DashboardLayout` wraps all pages:
  - Persistent **Sidebar**
  - Persistent **TopHeader**
  - Responsive layout with mobile sidebar toggle
- Includes a “glass” content shell (blur + transparency) for a premium UI effect.
- Reduced-motion friendly:
  - Detects `prefers-reduced-motion`
  - Conditionally applies animations/transitions

### 3) Overview Page (Stats + Activity + Visuals)
- Summary stat cards:
  - Total projects
  - Earnings
  - Tasks due
- Recent activity list (mock data)
- **Chart.js bar chart** showing monthly earnings (mock data)
- “Quick stats” section demonstrating conditional rendering based on tasks due
- Includes a small **Three.js snapshot component** for subtle 3D visuals

### 4) Projects Page (Table + Mobile Cards + Filtering)
- Displays projects with:
  - Project name + client name
  - Status badge (Active / Pending / Completed)
  - Deadline
- Filter buttons to quickly view projects by status
- Responsive rendering:
  - Desktop: table layout
  - Mobile: card layout

### 5) Three.js Visual Enhancements
- A full-page Three.js background scene behind the dashboard layout.
- A mini Three.js scene embedded inside the Overview page.
- Designed to stay subtle and not distract from readability.

## Tech Stack / Tools Used
- **React (Vite)** — component-based UI + fast dev workflow
- **React Router DOM** — multi-page routing without reload
- **Tailwind CSS** — responsive UI styling + utility classes
- **Chart.js** — dashboard chart (monthly earnings)
- **Three.js** — background + mini 3D scenes
- **ESLint** — code quality tooling

## Notes
This dashboard uses mock data for stats, projects, and activities (front-end only).
Built to demonstrate reusable layout patterns, responsive design, routing, charts, and 3D UI enhancements.

✅ Completed as part of the Elevvo internship front-end task set.

## How to Run Locally
```bash
npm install
npm run dev

