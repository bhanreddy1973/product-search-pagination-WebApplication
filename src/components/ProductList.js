import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../App'; // Import your CSS for table styling

const ProductList = ({ selectedCategories, searchTerm }) => {
    const [products, setProducts] = useState([]); // State to store fetched products
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle error messages
    const [pageCount, setPageCount] = useState(0); // State to manage the number of pages
    const [currentPage, setCurrentPage] = useState(0); // State to track the current page
    const limit = 10; // Number of products per page

    // Fetch products based on selected categories or search term
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading to true when fetching starts
            setError(null); // Reset error state on new fetch

            try {
                let apiUrl;

                // If categories are selected, fetch products by category
                if (selectedCategories.length > 0) {
                    const formattedCategories = selectedCategories.map(cat => cat.replace(/ /g, '-')).join(',');
                    apiUrl = `https://dummyjson.com/products/category/${formattedCategories}?limit=${limit}&skip=${currentPage * limit}`;
                } 
                // If no categories are selected, fetch products by search term if provided
                else if (searchTerm) {
                    apiUrl = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${limit}&skip=${currentPage * limit}`;
                } 
                // Otherwise, fetch all products
                else {
                    apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${currentPage * limit}`;
                }

                // console.log(`Fetching products with URL: ${apiUrl}`);

                // Fetch the products
                const response = await axios.get(apiUrl);
                const { products, total } = response.data;

                // console.log('Fetched products:', products);
                // console.log('Total products:', total);

                setProducts(products || []); // Set the products in state
                setPageCount(Math.ceil(total / limit)); // Calculate total pages
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false once fetching is done
            }
        };

        fetchProducts(); // Call the function to fetch products
    }, [currentPage, selectedCategories, searchTerm]); // Re-fetch products when current page, categories, or search term changes

    // Handle page click for pagination
    const handlePageClick = (data) => {
        setCurrentPage(data.selected); // Update the current page state based on user selection
    };

    // Display loading, error, or product table
    if (loading) return <p>Loading products, please wait...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Products</h2>
            {products.length === 0 ? (
                <p>No products available for the selected categories or search term.</p> // No products message
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.rating} ⭐</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination component */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num previous"
                nextLinkClassName="page-num next"
                activeLinkClassName="active"
                forcePage={currentPage} // Keeps the current page synced with the component state
            />
        </div>
    );
};

export default ProductList;
