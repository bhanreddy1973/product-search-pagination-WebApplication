import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    total: 0,
    pageCount: 0,
    selectedCategory: '',
    categories: [],
    productsLoading: false,
    productsError: null,
    categoriesLoading: false,
    categoriesError: null,
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ category, skip = 0, limit = 10 }, { rejectWithValue }) => {
        try {
            const apiUrl = category
                ? `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
                : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://dummyjson.com/products/categories');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create the products slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload;
        },
        setDefaultProducts(state, action) {
            state.products = action.payload; // Set default products
            state.total = action.payload.length; // Update total count
            state.pageCount = 1; // Since default products are one page
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.productsLoading = true;
                state.productsError = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsLoading = false;
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.pageCount = Math.ceil(action.payload.total / 10);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.productsLoading = false;
                state.productsError = action.payload;
            })
            .addCase(fetchCategories.pending, (state) => {
                state.categoriesLoading = true;
                state.categoriesError = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categoriesLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.categoriesLoading = false;
                state.categoriesError = action.payload;
            });
    },
});

// Export actions
export const { setSelectedCategory, setDefaultProducts } = productSlice.actions;

// Export reducer
export default productSlice.reducer;
