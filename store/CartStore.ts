import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void; // <--- Added clearCart type definition
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const exist = state.cart.find((i) => i.id === item.id);

          if (exist) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                  : i
              ),
            };
          }

          return {
            cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((i) =>
              i.id === id
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () =>
        set({
          cart: [],
        }), // <--- Added clearCart implementation

      totalItems: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "mhob-khmer-cart-storage", // Keeps cart items saved in localStorage
    }
  )
);