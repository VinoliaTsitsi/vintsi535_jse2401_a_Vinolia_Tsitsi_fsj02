// app/page.js
import Products from '../components/products';
import { fetchProducts } from '../lib/api';
import './globals.css';

export default async function HomePage() {
  try {
    const initialProducts = await fetchProducts(1);
    return (
      <main>
        <h1>Product List</h1>
        <Products initialProducts={initialProducts} />
      </main>
    );
  } catch (error) {
    return (
      <main>
        <h1>Error fetching products</h1>
        <p>There was an error fetching the product data. Please try again later.</p>
      </main>
    );
  }
}