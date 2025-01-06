import axios from 'axios';

// Fetch categories action
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get('https://dummyjson.com/products/categories');
    dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_CATEGORIES_ERROR', payload: error.message });
  }
};

// Fetch products action with pagination and optional search
export const fetchProducts = (category = '', search = '', skip = 0, limit = 10) => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  if (category) url += `&category=${category}`;
  if (search) url += `&q=${search}`;

  try {
    const response = await axios.get(url);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data.products });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error.message });
  }
};
