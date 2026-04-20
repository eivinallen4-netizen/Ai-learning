// NOTE: Shared utility helpers used across the app (class merging and common helpers).
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// NOTE: `cn` is a helper function used to transform values.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

