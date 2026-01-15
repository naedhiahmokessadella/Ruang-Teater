import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/* ================= SHADCN UTILS ================= */

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/* ================= FAVORITE LOGIC ================= */

const FAVORITE_KEY = "favorite_events";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];
  } catch {
    return [];
  }
}

export function addFavorite(event) {
  if (!event?.id) return;

  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === event.id);

  if (!exists) {
    localStorage.setItem(
      FAVORITE_KEY,
      JSON.stringify([...favorites, event])
    );
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter((item) => item.id !== id);
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
}

export function isEventFavorite(id) {
  return getFavorites().some((item) => item.id === id);
}
