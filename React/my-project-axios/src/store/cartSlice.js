import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] // Array to hold cart items
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        // If item exists, increase the quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add new item with quantity
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQnty: (state, action) => {
      const decreaseQntyItem = state.items.find(item => item.name === action.payload.name);
      if (decreaseQntyItem.quantity == 1) {
        state.items = state.items.filter(item => item.name !== action.payload.name);
      }
      decreaseQntyItem.quantity--;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
})

export const { addItem, removeItem, clearCart, decreaseQnty } = cartSlice.actions

export default cartSlice.reducer
