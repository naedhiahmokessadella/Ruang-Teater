import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/* ================= FAVORITE LOGIC ================= */

const FAVORITE_KEY = "favorite_events";

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];
};

export const addFavorite = (event) => {
  const favorites = getFavorites();
  const exists = favorites.some(item => item.id === event.id);

  if (!exists) {
    favorites.push(event);
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (id) => {
  const favorites = getFavorites().filter(item => item.id !== id);
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
};

export const isEventFavorite = (id) => {
  return getFavorites().some(item => item.id === id);
};