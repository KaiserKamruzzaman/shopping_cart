import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  id: number;
  quantity: number;
};
const items: CounterState[] =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems") || "[]")
    : [];
const quantity: number =
  localStorage.getItem("cartQuantity") !== null
    ? JSON.parse(localStorage.getItem("cartQuantity") || "0")
    : 0;

const initialState: {
  cartItems: CounterState[];
  quantity: number;
} = {
  cartItems: items,
  quantity: quantity,
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
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("cartQuantity", JSON.stringify(state.quantity));
      } else {
        state.cartItems.map((item, index) => {
          if (item.id == action.payload) {
            state.cartItems[index] = { ...item, quantity: item.quantity + 1 };
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          }
        });
        state.quantity += 1;
        localStorage.setItem("cartQuantity", JSON.stringify(state.quantity));
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
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        state.quantity -= 1;
        localStorage.setItem("cartQuantity", JSON.stringify(state.quantity));
      } else {
        state.cartItems.map((item, index) => {
          if (item.id == action.payload) {
            state.cartItems[index] = { ...item, quantity: item.quantity - 1 };
          }
        });
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        state.quantity -= 1;
        localStorage.setItem("cartQuantity", JSON.stringify(state.quantity));
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems.map((item) => {
        if (item.id == action.payload) {
          state.quantity = state.quantity - item.quantity;
        }
      });
      localStorage.setItem("cartQuantity", JSON.stringify(state.quantity));

      console.log("first");
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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
