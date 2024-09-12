// lib/api.js
export async function fetchProducts(skip = 0, limit = 20) {
    const response = await fetch(`https://next-ecommerce-api.vercel.app/products?_start=${skip}&_limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }

export async function fetchProduct(id) {
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
}