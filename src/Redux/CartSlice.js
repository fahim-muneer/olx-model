import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        alert(("Prodict added to the Cart!!"))
        
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      alert("Product removed")
    },

    clearCart: (state) => {
      state.items = [];
      alert("Cart cleared.")
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
