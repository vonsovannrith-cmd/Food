import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((item) => item !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: "wishlist-storage",
    }
  )
);