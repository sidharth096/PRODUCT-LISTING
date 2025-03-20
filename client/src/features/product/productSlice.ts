// features/product/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: any[];
  filteredProducts: any[];
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<any[]>) {
      state.products = action.payload;
      state.filteredProducts = action.payload; // Initialize filteredProducts with all products
    },
    setFilteredProducts(state, action: PayloadAction<any[]>) {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setProducts, setFilteredProducts } = productSlice.actions;
export default productSlice.reducer;