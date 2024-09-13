"use client"; // Mark the component as a Client Component

import { useState, useEffect } from 'react'; // Import useEffect
import { useRouter } from 'next/navigation'; // Use next/navigation for the router
import Image from 'next/image';
import { fetchProduct } from '@/lib/api';

export default function ProductDetail({ params }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For image carousel
  const [product, setProduct] = useState(null); // Store product data
  const router = useRouter(); // For navigation back to the product page

  // Fetch product data on the client side
  useEffect(() => {
    async function getProduct() {
      const fetchedProduct = await fetchProduct(params.id);
      setProduct(fetchedProduct);
    }
    getProduct();
  }, [params.id]);

  if (!product) {
    return <p className="text-center text-red-500 text-xl font-semibold mt-10">Loading product...</p>;
  }

  // Handle image carousel navigation
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  // Check if the product has images and use the first image as a default
  const imageUrl = product.images && product.images.length > 0 ? product.images[currentImageIndex] : '/default-image.jpg';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Back to Products Button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
          onClick={() => router.push('/')}
        >
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="relative flex justify-center items-center">
            <Image
              src={imageUrl}
              alt={product.title || 'Product Image'}
              width={600}
              height={400}
              className="rounded-lg"
            />

            {/* Image Carousel Controls */}
            {product.images && product.images.length > 1 && (
              <>
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                  onClick={handlePrevImage}
                >
                  &lt;
                </button>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                  onClick={handleNextImage}
                >
                  &gt;
                </button>
              </>
            )}
          </div>

          {/* Product Information Section */}
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.title || 'No Title'}</h1>
            <p className="text-gray-700 mb-4">{product.description || 'No description available.'}</p>
            <p className="text-xl font-semibold text-blue-600 mb-4">Price: ${product.price || 'N/A'}</p>
            <p className="text-gray-600 mb-2">Category: <span className="font-medium">{product.category || 'N/A'}</span></p>
            <p className="text-gray-600 mb-2">Tags: <span className="font-medium">{product.tags ? product.tags.join(', ') : 'No tags'}</span></p>
            <p className="text-gray-600 mb-2">Rating: <span className="font-medium">{product.rating !== undefined ? product.rating : 'No rating'}</span></p>
            <p className="text-gray-600 mb-6">Stock: <span className="font-medium">{product.stock !== undefined ? product.stock : 'Unavailable'}</span></p>
            
            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h2>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-300 py-4">
                    <p className="text-gray-800 font-medium mb-1">{review.name} <span className="text-gray-500">({review.date})</span></p>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    <p className="text-yellow-500">Rating: {review.rating}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
