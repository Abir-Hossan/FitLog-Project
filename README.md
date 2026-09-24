# FitLog — Workout Library

A modern, responsive workout library and daily workout planning application built with **Next.js, React, TypeScript, and Tailwind CSS**.

FitLog provides a focused fitness experience where users can browse workouts, view detailed exercise information, add exercises to today's workout plan, save workouts for later, and manage their workout list using persistent browser storage.

---

## 📌 Project Overview

**FitLog** is a dark-themed workout library application designed with a professional gym-dashboard aesthetic.

The application allows users to:

- Browse available workouts
- View detailed workout information
- Add workouts to today's plan
- Save workouts for later
- Remove workouts from their plan
- Mark planned workouts as completed
- Sort workouts
- Track planned workout statistics
- Persist workout data using LocalStorage
- Use the application across desktop, tablet, and mobile devices

The interface uses a dark background, high contrast, subtle borders, and a lime-green accent color.

---

## ✨ Features

### 🏋️ Workout Library

The homepage provides a workout library containing exercises retrieved from the FitLog API.

Each workout card displays:

- Workout image
- Muscle group/category
- Workout name
- Equipment
- Duration
- Calories
- Rating

Clicking a workout card opens its dedicated workout details page.

---

### 📋 Workout Details

Each workout has a dedicated details page.

The details page displays:

- Large workout image
- Workout name
- Description
- Muscle group/category
- Equipment
- Difficulty
- Sets
- Repetitions
- Duration
- Calories
- Rating
- Step-by-step instructions

Users can perform two primary actions:

#### Add to Today's Plan

Adds the workout to the user's daily workout plan.

The application:

- Adds the workout to the plan
- Updates the Plan counter
- Saves the plan to LocalStorage
- Displays a success notification
- Prevents duplicate additions

#### Save for Later

Saves the workout for future use.

The application:

- Adds the workout to the saved list
- Updates the Saved counter
- Saves the list to LocalStorage
- Displays a success notification

---

## 📅 My Plan

The `/my-plan` page provides workout management functionality.

There are two tabs:

### Today's Plan

Displays workouts currently scheduled for the day.

Each workout provides:

- Workout thumbnail
- Workout name
- Equipment
- Duration
- Calories
- Rating
- View Details button
- Mark as Done button
- Remove button

### Saved

Displays workouts saved for later.

Each saved workout provides:

- Workout thumbnail
- Workout name
- Equipment
- Duration
- Calories
- Rating
- View Details button
- Remove button

---

## 📊 Dynamic Statistics

The My Plan page dynamically calculates:

### Exercises

Number of workouts currently added to today's plan.

### Minutes

Total duration of all workouts in today's plan.

### Calories

Total calories associated with today's planned workouts.



### Project Structure

FitLog/
│
├── app/
│   ├── my-plan/
│   │   └── page.tsx
│   │
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   ├── EmptyState.tsx
│   ├── FitLogProvider.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LoadingSpinner.tsx
│   ├── Navbar.tsx
│   ├── PlanCard.tsx
│   ├── StatsCard.tsx
│   ├── ToastProvider.tsx
│   ├── WorkoutCard.tsx
│   ├── WorkoutDetails.tsx
│   ├── WorkoutGrid.tsx
│   └── WorkoutPageClient.tsx
│
├── lib/
│   ├── api.ts
│   ├── storage.ts
│   └── types.ts
│
├── public/
│   ├── banner.png
│   └── logo.png
│
├── .env.example
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
