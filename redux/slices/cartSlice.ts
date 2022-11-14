import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

export interface State {
    items: Product[];
}

const initialState: State = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        //Actions
        addToCart: (state, action: PayloadAction<Product>) => {
            const itemInCart = state.items.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.items = [...state.items, action.payload];
            }
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
        },
        clearCart: () => initialState,
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
