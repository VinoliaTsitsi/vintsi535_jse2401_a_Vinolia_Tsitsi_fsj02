import { Suspense } from 'react';
import { fetchProducts } from '../../lib/api';
import ProductGrid from '../../components/ProductGrid';
import Pagination from '../../components/Pagination';

export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const products = await fetchProducts(page);

  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductGrid products={products} />
      </Suspense>
      <Pagination currentPage={page} />
    </div>
  );
}