import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      state.items.push({
        ...item,
        quantity: item.quantity || 1, // Ensure quantity is at least 1
        price: item.price ?? 100, // Ensure price is 100 if missing
      });
    },
    
    addGroceryItem: (state, action) => {
      const item = { ...action.payload };

      // 🔹 Ensure grocery items also get a default price of ₹100
      if (!item.price || isNaN(item.price)) {
        item.price = 100;
      }

      const existingItem = state.items.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addItem, addGroceryItem, removeItem, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
