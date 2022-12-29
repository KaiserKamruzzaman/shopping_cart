import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  id: number;
  quantity: number;
};

const initialState: {
  cartItems: CounterState[];
  quantity: number;
} = {
  cartItems: [],
  quantity: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    getItemQuantity: (state, action: PayloadAction<number>) => {
      console.log("dhukse check..." + action.payload);
      state.cartItems.find((item) => item.id == action.payload)?.quantity || 0;
    },

    increaseCartQuantity: (state, action: PayloadAction<number>) => {
      if (state.cartItems.find((item) => item.id == action.payload) == null) {
        console.log("kisu pai nai..");
        state.cartItems.push({ id: action.payload, quantity: 1 });
        state.quantity += 1;
      } else {
        state.cartItems.map((item, index) => {
          if (item.id == action.payload) {
            state.cartItems[index] = { ...item, quantity: item.quantity + 1 };
          }
        });
        state.quantity += 1;
      }
    },
    // decrement: (state, action: PayloadAction<number>) => {
    //   state.quantity -= 1;
    // },
  },
});

export const { increaseCartQuantity, getItemQuantity } = counterSlice.actions;

export default counterSlice.reducer;
