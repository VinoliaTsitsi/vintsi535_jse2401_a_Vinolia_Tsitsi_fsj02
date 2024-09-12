// app/page.js
import RootLayout from './layout'; // Import the RootLayout
import Products from '../components/products';
import { fetchProducts } from '../lib/api';
import './globals.css';

export default async function HomePage() {
  try {
    const initialProducts = await fetchProducts(1);
    return (
      <RootLayout>
        <main>
          <Products initialProducts={initialProducts} />
        </main>
      </RootLayout>
    );
  } catch (error) {
    return (
      <RootLayout>
        <main>
          <h1>Error fetching products</h1>
          <p>There was an error fetching the product data. Please try again later.</p>
        </main>
      </RootLayout>
    );
  }
}
