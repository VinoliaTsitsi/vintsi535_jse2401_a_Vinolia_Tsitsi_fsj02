'use client';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>Loading...</div>; // Handle case when product is not available
  }

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <div className="relative w-full h-48 mb-4">
        <Image 
          src={product.images[0]} 
          alt={product.title} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-lg"
          priority
        />
      </div>
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-700 mb-2">Price: ${product.price}</p>
      <p className="text-gray-600 mb-4">Category: {product.category}</p>

      {/* Button linking to product detail page */}
      <Link href={`/products/${product.id}`}>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
