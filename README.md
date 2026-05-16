# edTech Visual Learning

A production-style full-stack ed-tech platform built with Next.js App Router, Tailwind CSS, Framer Motion, MongoDB, Mongoose, JWT auth, and Zustand.

## Features

- Premium long-scroll landing page with glassmorphism, gradients, and animations
- JWT authentication with secure password hashing
- MongoDB data models for users, courses, progress, and quiz attempts
- Dashboard with course cards, progress tracking, and learner profile
- Split-screen course player with summaries, quizzes, and progress saving
- AI content transformation endpoint for dense text to visual-friendly structure
- Gamification via XP, streaks, badges, and leaderboard mock data
- Responsive design with skeleton loading and a dark/light mode toggle

## Run locally

1. Create a MongoDB database locally or use MongoDB Atlas.
2. Copy `.env.example` to `.env.local`.
3. Fill in:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/edtech
JWT_SECRET=replace-with-a-long-random-secret
```

4. Install dependencies:

```bash
npm install
```

5. Start the app:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Main routes

- `/` landing page
- `/signup` signup
- `/login` login
- `/dashboard` dashboard home
- `/dashboard/courses` courses
- `/dashboard/progress` progress overview
- `/dashboard/profile` learner profile
- `/transform` AI content transformer
- `/leaderboard` leaderboard

## API routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/courses`
- `POST /api/courses`
- `GET /api/courses/:id`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`
- `GET /api/progress`
- `POST /api/progress`
- `POST /api/quiz/submit`
- `POST /api/ai/transform`

## Notes

- Courses are auto-seeded on first read if the database is empty.
- The AI transform feature uses a local deterministic transformer for demo purposes, so the app runs without third-party API keys.
# QuizTime
# QuizTime
