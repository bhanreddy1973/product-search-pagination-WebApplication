import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    total: 0,
    pageCount: 0,
    dummyVariable: 0, // 0 indicates showing all products
    selectedCategories: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload.products;
            state.total = action.payload.total;
            state.pageCount = action.payload.pageCount;
        },
        setDummyVariable(state, action) {
            state.dummyVariable = action.payload;
        },
        setSelectedCategories(state, action) {
            state.selectedCategories = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const {
    setProducts,
    setDummyVariable,
    setSelectedCategories,
    setLoading,
    setError,
} = productSlice.actions;

export default productSlice.reducer;

// Thunk to fetch products
export const fetchProducts = (currentPage, limit) => async (dispatch, getState) => {
    const { dummyVariable, selectedCategories } = getState().products;

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
        let apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${currentPage * limit}`;

        // If dummy variable is not 0, fetch products by category
        if (dummyVariable !== 0 && selectedCategories.length === 1) {
            apiUrl = `https://dummyjson.com/products/category/${selectedCategories[0]}?limit=${limit}&skip=${currentPage * limit}`;
        }

        const response = await axios.get(apiUrl);
        const { products, total } = response.data;

        dispatch(setProducts({
            products,
            total,
            pageCount: Math.ceil(total / limit),
        }));
    } catch (error) {
        dispatch(setError('Failed to fetch products.'));
    } finally {
        dispatch(setLoading(false));
    }
};
