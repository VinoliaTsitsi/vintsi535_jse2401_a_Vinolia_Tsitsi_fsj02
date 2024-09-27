/**
 * Fetches a list of products from the API with pagination.
 *
 * @param {number} [skip=0] - The number of products to skip (for pagination).
 * @param {number} [limit=20] - The maximum number of products to fetch.
 * @returns {Promise<Object[]>} A promise that resolves to an array of product objects.
 * @throws {Error} Throws an error if the fetch operation fails or the response is not OK.
 *
 * @example
 * const products = await fetchProducts(0, 20);
 */
export async function fetchProducts(skip = 0, limit = 20) {
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=${limit}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

/**
 * Fetches a single product by its ID from the API.
 *
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to a product object.
 * @throws {Error} Throws an error if the fetch operation fails or the response is not OK.
 *
 * @example
 * const product = await fetchProduct('123');
 */
export async function fetchProduct(id) {
  try {
    const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
    
    // Check if the API response is not OK
    if (!response.ok) {
      const message = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(message);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch product:', error.message);
    throw error; // Re-throw the error to handle it in the UI if needed
  }
}

