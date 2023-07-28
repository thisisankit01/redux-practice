//for a API call

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    // setProducts(state, action) {
    //   state.data = action.payload;
    // },
    // setStatus(state, action) {
    //   state.status = action.payload;
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//thunks

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const productItems = await fetch(`http://fakestoreapi.com/products`);
  const data = await productItems.json();
  return data;
});

// export function fetchProducts() {
//   return async function fetchProductsThunks(dispatch, getState) {
//     console.log(getState);
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const productItems = await fetch(`http://fakestoreapi.com/products`);
//       const jsonProducts = await productItems.json();
//       dispatch(setProducts(jsonProducts));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       console.log(err);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }
