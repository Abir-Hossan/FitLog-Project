# FitLog — Workout Library

A responsive dark-themed workout library built from the supplied FitLog design references. It connects to the FitLog API, supports workout details, a five-item daily plan, saved workouts, sorting, completion state, and browser persistence.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS v4
- Lucide React
- react-hot-toast
- LocalStorage

## Features

- Workout browsing from the real API
- Workout detail pages with dynamic routing
- Add workouts to today's plan (maximum 5)
- Save workouts for later
- Mark planned workouts as done
- Remove planned/saved workouts
- Persistent `todayPlan` and `savedWorkouts` localStorage state
- Duration / calories / rating sorting
- Loading, API error, empty, and 404 states
- Responsive desktop, tablet, and mobile layouts
- Reusable React components

## API

Default endpoint:

`https://api.abcz.workers.dev/api/fitlog`

Override it locally with:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.abcz.workers.dev/api/fitlog
```

The API response is normalized in `lib/api.ts` so common array/data/result response envelopes and common field names are supported without hardcoding workout records.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Verification

```bash
npm run typecheck
npm run build
```

## Project structure

```text
fitlog/
├─ app/
│  ├─ my-plan/page.tsx
│  ├─ workout/[id]/page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  └─ page.tsx
├─ components/
│  ├─ EmptyState.tsx
│  ├─ FitLogProvider.tsx
│  ├─ Footer.tsx
│  ├─ Hero.tsx
│  ├─ LoadingSpinner.tsx
│  ├─ Navbar.tsx
│  ├─ PlanCard.tsx
│  ├─ StatsCard.tsx
│  ├─ ToastProvider.tsx
│  ├─ WorkoutCard.tsx
│  ├─ WorkoutDetails.tsx
│  └─ WorkoutGrid.tsx
├─ lib/
│  ├─ api.ts
│  ├─ storage.ts
│  └─ types.ts
├─ public/
│  ├─ banner.png
│  └─ logo.png
├─ .env.example
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
└─ tsconfig.json
```
