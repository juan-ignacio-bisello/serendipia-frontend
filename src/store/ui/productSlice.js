import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        clothes: [],
      },
      reducers: {
        setProducts: ( state, action ) => {
          state.clothes = action.payload;
        }
      }
});


// Action creators are generated for each case reducer function
export const { setProducts } = productSlice.actions;