import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn() merges Tailwind classes safely, avoiding conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
