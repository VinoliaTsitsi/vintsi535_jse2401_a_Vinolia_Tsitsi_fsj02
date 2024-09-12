// components/Products.js

'use client'; // Mark this component as a client component

import { useState, useEffect } from 'react';
import { fetchProducts } from '../lib/api';
import ProductCard from './productCard'; // Ensure this path is correct

const Products = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const productsPerPage = 20; // Number of products to fetch per page

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const skip = (page - 1) * productsPerPage; // Calculate skip value
      console.log(`Fetching products with skip=${skip} and limit=${productsPerPage}`);

      try {
        const newProducts = await fetchProducts(skip, productsPerPage);
        console.log('Fetched products:', newProducts);
        setProducts(prevProducts => {
          // If it's the first page, replace the products
          if (page === 1) {
            return newProducts;
          }
          // If it's not the first page, append new products to the existing list
          return [...prevProducts, ...newProducts];
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}
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