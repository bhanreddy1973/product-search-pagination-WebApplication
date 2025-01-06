import React, { useState } from 'react';

const SearchBar = ({ setSearch, setSearchResults }) => {
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        const newInput = e.target.value;
        setInput(newInput); // Update input state as the user types
        setSearch(newInput); // Update search term in the parent
    };

    const handleSearch = () => {
        fetchProducts(input);
    };

    // Fetch products using the DummyJSON API based on the search input
    const fetchProducts = (query) => {
        fetch(`https://dummyjson.com/products/search?q=${query}`)
            .then((res) => res.json())
            .then((data) => {
                setSearchResults(data.products); // Set products in state
            })
            .catch((error) => {
                console.error('Error fetching products:', error); // Log any errors
            });
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search products..."
                value={input}
                onChange={handleInputChange} // Update the input on change
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
