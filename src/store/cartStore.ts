import { create } from 'zustand';

import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';

interface CartState {
  items: CartItem[];
  checkoutCompleted: boolean;
  increment: (product: Product) => void;
  decrement: (productId: number) => void;
  remove: (productId: number) => void;
  clearCart: () => void;
  markCheckoutCompleted: () => void;
  resetCheckout: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  checkoutCompleted: false,

  increment: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
          checkoutCompleted: false,
        };
      }

      return {
        items: [
          ...state.items,
          {
            product,
            quantity: 1,
          },
        ],
        checkoutCompleted: false,
      };
    }),

  decrement: (productId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    })),

  remove: (productId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.product.id !== productId,
      ),
    })),

  clearCart: () =>
    set({
      items: [],
    }),

  markCheckoutCompleted: () =>
    set({
      checkoutCompleted: true,
    }),

  resetCheckout: () =>
    set({
      checkoutCompleted: false,
    }),
}));
