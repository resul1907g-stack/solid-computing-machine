import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function getQualityColor(result: "GREEN" | "YELLOW" | "RED"): string {
  switch (result) {
    case "GREEN":
      return "bg-emerald-500";
    case "YELLOW":
      return "bg-amber-400";
    case "RED":
      return "bg-red-500";
  }
}

export function getQualityTextColor(result: "GREEN" | "YELLOW" | "RED"): string {
  switch (result) {
    case "GREEN":
      return "text-emerald-600";
    case "YELLOW":
      return "text-amber-600";
    case "RED":
      return "text-red-600";
  }
}

export function calculateQualityResult(
  score: number,
  level1: number = 85,
  level2: number = 75
): "GREEN" | "YELLOW" | "RED" {
  if (score >= level1) return "GREEN";
  if (score >= level2) return "YELLOW";
  return "RED";
}
