import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  isOpen: boolean;
}

const initialState: CartState = {
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cartState",
  initialState,
  reducers: {
    cartShow: (state) => {
      state.isOpen = true;
    },
    cartClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { cartShow, cartClose } = cartSlice.actions;

export default cartSlice.reducer;
