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
    decreaseCartQuantity: (state, action: PayloadAction<number>) => {
      console.log("inside decrease...");
      if (
        state.cartItems.find((item) => item.id == action.payload)?.quantity == 1
      ) {
        console.log("ekhn delete korte hbe..");
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        state.quantity -= 1;
      } else {
        state.cartItems.map((item, index) => {
          if (item.id == action.payload) {
            state.cartItems[index] = { ...item, quantity: item.quantity - 1 };
          }
        });
        state.quantity -= 1;
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      console.log("first");
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    cartTotalQuantity: (state) => {
      state.cartItems.reduce((accumulator, item) => {
        return (state.quantity = item.quantity + accumulator);
      }, 0);
    },
  },
});

export const {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeItemFromCart,
  getItemQuantity,
  cartTotalQuantity,
} = counterSlice.actions;

export default counterSlice.reducer;
