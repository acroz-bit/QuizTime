"use client";

import { create } from "zustand";

type AppState = {
  xp: number;
  streak: number;
  lastCompletedLesson: string | null;
  hydrateStats: (xp: number, streak: number) => void;
  awardXp: (value: number, lessonId?: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  xp: 120,
  streak: 1,
  lastCompletedLesson: null,
  hydrateStats: (xp, streak) => set({ xp, streak }),
  awardXp: (value, lessonId) =>
    set((state) => ({
      xp: state.xp + value,
      streak: state.streak + 1,
      lastCompletedLesson: lessonId ?? state.lastCompletedLesson
    }))
}));
