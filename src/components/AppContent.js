import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList'; 
import { fetchCategories, fetchProducts } from './store/productSlice';
import './App.css';
import '../App';

// Error Boundary for catching errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Helper hook for querying URL params
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AppContent = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get initial categories from the query parameters
  const initialCategories = query.getAll('category');
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);

  useEffect(() => {
    // Fetch categories when component mounts
    dispatch(fetchCategories());

    // Fetch products based on the selected categories whenever they change
    if (selectedCategories.length > 0) {
      dispatch(fetchProducts({ category: selectedCategories.join(','), skip: 0 }));
    } else {
      dispatch(fetchProducts({ skip: 0 })); 
    }
  }, [dispatch, selectedCategories]); // Add selectedCategories to dependencies

  const handleCategoryChange = (newCategories) => {
    // Ensure newCategories is an array
    const categoriesArray = Array.isArray(newCategories) ? newCategories : [newCategories];
    setSelectedCategories(categoriesArray); 

    // Construct the query string for navigation
    const queryString = categoriesArray.length > 0 
      ? `?category=${categoriesArray.join('&category=')}` 
      : ''; 
    navigate(queryString);
  };

  return (
    <div>
      <div className="text-section">
        <h2>Welcome to Our Product Catalog</h2>
        <p>Select a category and click "Search" to filter the products. If no category is selected, all products will be shown.</p>
      </div>

      <div>
        <div className='catbox'>
          <ErrorBoundary>
            <CategoryList 
              selectedCategories={selectedCategories} 
              setSelectedCategories={handleCategoryChange} // Ensure this function is passed correctly
            />
          </ErrorBoundary>
        </div>

        <div className='probox'>
          <ErrorBoundary>
            <ProductList selectedCategories={selectedCategories} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
};

export default App;
