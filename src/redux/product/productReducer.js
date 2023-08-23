// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    categoryProduct: null,
    categoryName: "",
    categoryId: 0
};
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        categoryProduct(state, action) {
            state.categoryProduct = action.payload;
        },
        categoryName(state, action) {
            state.categoryName = action.payload;
        },
        categoryId(state, action) {
            state.categoryId = action.payload;
        },
    },
});
export const { categoryProduct, categoryName, categoryId } = productSlice.actions;
export default productSlice.reducer;
