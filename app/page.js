import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RootLayout from './layout'; // Import the RootLayout
import Products from './components/products';
import { fetchProducts } from '../lib/api';
import './globals.css';

/**
 * HomePage component renders the main page of the application.
 *
 * This component fetches the initial product data and displays it using the Products component.
 * If there is an error fetching the product data, an error message is displayed instead.
 *
 * @returns {Promise<JSX.Element>} A promise that resolves to the HomePage component.
 *
 * @throws {Error} Throws an error if there is an issue fetching the product data.
 *
 * @example
 * return (
 *   <HomePage />
 * );
 */
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
