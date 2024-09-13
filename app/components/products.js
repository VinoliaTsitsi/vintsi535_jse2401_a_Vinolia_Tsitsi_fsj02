'use client'; // Mark this component as a client component

import { useState, useEffect } from 'react';
import { fetchProducts } from '../../lib/api'; // Ensure the fetchProducts function is properly imported
import ProductCard from './productCard'; // Ensure this path is correct

/**
 * Products component displays a paginated list of products.
 *
 * This component fetches products from an API based on the current page and updates
 * the product list accordingly. It includes pagination controls to navigate through
 * the pages of products.
 *
 * @param {Object} props - Component properties.
 * @param {Object[]} props.initialProducts - Initial list of products to display.
 * @param {number} props.initialProducts[].id - Unique identifier for the product.
 * @param {string} props.initialProducts[].title - Title of the product.
 * @param {string} props.initialProducts[].description - Description of the product.
 * @param {string} props.initialProducts[].image - URL of the product image.
 * @param {number} props.initialProducts[].price - Price of the product.
 * @param {string} props.initialProducts[].category - Category of the product.
 * @param {number} props.initialProducts[].rating - Rating of the product.
 * 
 * @returns {JSX.Element} The Products component.
 * 
 * @example
 * const initialProducts = [
 *   { id: 1, title: 'Product 1', description: 'Description 1', image: 'https://example.com/image1.jpg', price: 100, category: 'Category 1', rating: 4.5 },
 *   { id: 2, title: 'Product 2', description: 'Description 2', image: 'https://example.com/image2.jpg', price: 150, category: 'Category 2', rating: 4.0 },
 * ];
 * 
 * return <Products initialProducts={initialProducts} />;
 */
const Products = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts); // Set initial products
  const [page, setPage] = useState(1); // Initialize page state
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [error, setError] = useState(null); // Error handling
  const productsPerPage = 20; // Number of products to fetch per page

  // Fetch products whenever the page changes
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Show loading spinner
      const skip = (page - 1) * productsPerPage; // Calculate the skip value

      try {
        const newProducts = await fetchProducts(skip, productsPerPage); // Fetch products with skip and limit
        setProducts(newProducts); // Replace products with new fetched products
      } catch (err) {
        setError(err.message); // Handle any error that occurs
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    loadProducts(); // Call the product loader function
  }, [page]); // Re-run whenever the page state changes

  // Handle moving to the next page
  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Handle moving to the previous page
  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>} {/* Show loading spinner */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
          {/* Pagination controls */}
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
              disabled={products.length < productsPerPage} // Disable if there are less than productsPerPage items
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
