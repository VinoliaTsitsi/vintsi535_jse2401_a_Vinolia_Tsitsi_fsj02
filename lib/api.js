export async function fetchProducts(skip = 0, limit = 20) {
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=${limit}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}


export async function fetchProduct(id) {
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
}