import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList'; 
import SearchBar from './components/SearchBar'; // Import the SearchBar component
import { fetchCategories, fetchProducts } from './store/productSlice';
import './App.css';

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
    // console.error("Error caught by Error Boundary: ", error, errorInfo);
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

  const initialCategories = query.getAll('category') || []; // Ensure we have an array
  const [selectedCategories, setSelectedCategories] = useState(initialCategories.map(decodeURIComponent)); // Decode any existing categories
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const [searchResults, setSearchResults] = useState([]); // State to hold search results

  useEffect(() => {
    dispatch(fetchCategories());

    if (selectedCategories.length > 0) {
      const formattedCategories = selectedCategories.map(cat => cat.replace(/ /g, '-')).join(','); // Format categories
      dispatch(fetchProducts({ category: formattedCategories, skip: 0 }));
    } else {
      // Fetch all products when no category is selected
      dispatch(fetchProducts({ skip: 0 }));
    }
  }, [dispatch, selectedCategories]);

  const handleCategoryChange = (newCategory) => {
    const formattedCategory = newCategory.replace(/ /g, '-'); // Format category for API and URL
    setSelectedCategories([newCategory]); // Update selected categories

    // Construct the query string for navigation
    const queryString = newCategory 
      ? `?category=${formattedCategory}` 
      : ''; 
    navigate(queryString);

    // Fetch products based on the selected category
    dispatch(fetchProducts({ category: formattedCategory, limit: 10, skip: 0 }));
  };

  // Clear button handler
  const handleClear = () => {
    setSelectedCategories([]); // Reset selected categories
    navigate(''); // Clear the URL
    dispatch(fetchProducts({ skip: 0 })); // Fetch all products
    setSearchResults([]); // Clear search results
    setSearchTerm(''); // Clear search term
  };

  return (
    <div className='app-content'>
      <div className='catbox'>
        <nav className="navbar">
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </nav>
        <div className='category-list'>
          <ErrorBoundary>
            <CategoryList 
              selectedCategory={selectedCategories[0]} // Use the first selected category
              setSelectedCategory={handleCategoryChange} // Pass the function here
            />
          </ErrorBoundary>
        </div>
      </div>
      
      <div className='probox'>
        <nav className="navbar">
          <SearchBar setSearch={setSearchTerm} setSearchResults={setSearchResults} /> {/* Pass search handler */}
        </nav>
        
        <ErrorBoundary>
          <ProductList selectedCategories={selectedCategories} searchResults={searchResults} searchTerm={searchTerm} />
        </ErrorBoundary>
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
