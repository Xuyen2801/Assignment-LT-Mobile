import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

export interface CartItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] as CartItem[] },
  reducers: {
    addToCart(state, action: PayloadAction<{ id: string; title: string; price: number }>) {
      const { id, title, price } = action.payload;
      const existing = state.items.find((i) => i.bookId === id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ bookId: id, title, price, quantity: 1 });
      }
    },

    // Giảm 1; nếu còn 1 thì bỏ sách khỏi giỏ
    decrease(state, action: PayloadAction<string>) {
      const existing = state.items.find((i) => i.bookId === action.payload);
      if (!existing) return;

      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.bookId !== action.payload);
      }
    },
  },
});

export const { addToCart, decrease } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (s: RootState) => s.cart.items;

export const selectCartCount = (s: RootState) =>
  s.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (s: RootState) =>
  s.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);