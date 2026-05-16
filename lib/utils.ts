import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function readingTime(text: string) {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 180));
}
