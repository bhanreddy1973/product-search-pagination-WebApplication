import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productSlice'; // Ensure this path is correct

const CategoryList = ({ selectedCategory, setSelectedCategory }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
              // console.log('hi21')
                const response = await fetch('https://dummyjson.com/products/categories');
                if (!response.ok) throw new Error('Failed to fetch categories.');
                const data = await response.json();

                // Log fetched categories to check the structure
                // console.log("Fetched Categories:", data);

                // If data is an array of objects, map them to their names
                if (Array.isArray(data)) {
                    // If data items are objects with a 'name' property, map to their names
                    const categoryNames = data.map(item => typeof item === 'object' ? item.name : item);
                    setCategories(categoryNames);
                } else {
                    throw new Error('Categories data is not in the expected format.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (category) => {
      // console.log('hi1');
        // Set the selected category
        setSelectedCategory(category);
        // console.log(category);

        // Fetch products based on the selected category
        dispatch(fetchProducts({ category })); 
        // console.log(category);
    };

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="category-list">
      {categories.length === 0 ? (
          <p>No categories available.</p>
      ) : (
          categories.map((category, index) => (
              <div key={`${category}-${index}`} className="form-check category-item"> {/* Use Bootstrap form-check class */}
                  <input
                      className="form-check-input" // Bootstrap class for radio input
                      type="radio"
                      id={`category-${index}`} 
                      name="category"
                      checked={selectedCategory === category} 
                      onChange={() => handleCategoryChange(category)} 
                  />
                  <label className="form-check-label" htmlFor={`category-${index}`}> {/* Bootstrap label styling */}
                      {category}
                  </label>
              </div>
          ))
      )}
  </div>
  
    );
};

export default CategoryList;
