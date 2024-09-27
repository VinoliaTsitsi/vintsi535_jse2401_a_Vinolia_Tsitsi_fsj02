'use client'; // Mark this component as a client component

import { useState, useEffect } from 'react';
import { fetchProducts } from '../../lib/api'; // Ensure the fetchProducts function is properly imported
import ProductCard from './productCard';
import Header from './header';

const Products = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts); // Set initial products
  const [filteredProducts, setFilteredProducts] = useState(initialProducts); // Filtered products state
  const [page, setPage] = useState(1); // Initialize page state
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [error, setError] = useState(null); // Error handling
  const productsPerPage = 20; // Number of products to fetch per page

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Show loading spinner
      const skip = (page - 1) * productsPerPage; // Calculate the skip value

      try {
        const newProducts = await fetchProducts(skip, productsPerPage); // Fetch products with skip and limit
        setProducts(newProducts); // Replace products with new fetched products
        setFilteredProducts(newProducts); // Initialize the filtered products
      } catch (err) {
        setError(err.message); // Handle any error that occurs
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    loadProducts(); // Call the product loader function
  }, [page]); // Re-run whenever the page state changes

  const handleCategoryChange = (category) => {
    if (category === 'All categories') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleSearchChange = (query) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSortingChange = (sortingOption) => {
    const sortedProducts = [...filteredProducts];
    if (sortingOption === 'low') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortingOption === 'high') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <Header
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        onSortingChange={handleSortingChange}
      />
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={handleNextPage}
              disabled={products.length < productsPerPage}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
