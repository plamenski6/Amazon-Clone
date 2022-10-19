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
            if (state.items.some((item) => item.id === action.payload.id)) {
                state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        item.quantity && action.payload.quantity && (item.quantity += action.payload.quantity);
                    }
                });
            } else {
                state.items = [...state.items, action.payload];
            }
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {},
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
