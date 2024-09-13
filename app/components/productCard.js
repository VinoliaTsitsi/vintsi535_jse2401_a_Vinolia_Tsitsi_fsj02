'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/**
 * ProductCard component displays a single product with an image carousel.
 *
 * The component handles multiple images for a product, providing navigation
 * controls to scroll through them. It also includes product details and a 
 * link to the product detail page.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.product - Product details.
 * @param {number} props.product.id - Unique identifier for the product.
 * @param {string} props.product.title - Title of the product.
 * @param {string[]} props.product.images - Array of image URLs for the product.
 * @param {number} props.product.price - Price of the product.
 * @param {string} props.product.category - Category of the product.
 * @param {string} [props.product.description] - Optional description of the product.
 * 
 * @returns {JSX.Element} The ProductCard component.
 */
const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <div>Loading...</div>; // Handle case when product is not available
  }

  const { images, title, price, category, id } = product;
  const hasImages = images && images.length > 0;

  /**
   * Handles moving to the next image in the carousel.
   * Loops back to the first image when reaching the end.
   */
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  /**
   * Handles moving to the previous image in the carousel.
   * Loops back to the last image when reaching the beginning.
   */
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white w-64 h-80 flex flex-col items-center">
      <div className="relative w-full h-40 mb-4 overflow-hidden">
        {hasImages ? (
          <div className="relative w-full h-full">
            <Image 
              src={images[currentImageIndex] || '/placeholder-image.jpg'} 
              alt={title || 'Product Image'} 
              layout="fill" 
              objectFit="contain" 
              className="rounded-lg"
              priority
            />
            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePreviousImage} 
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-1"
                >
                  &lt;
                </button>
                <button 
                  onClick={handleNextImage} 
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-1"
                >
                  &gt;
                </button>
              </>
            )}
          </div>
        ) : (
          <Image 
            src='/placeholder-image.jpg' 
            alt='Product Image' 
            layout="fill" 
            objectFit="contain" 
            className="rounded-lg"
            priority
          />
        )}
      </div>
      <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
      <p className="text-gray-700 mb-2 text-center">Price: ${price}</p>
      <p className="text-gray-600 mb-4 text-center">Category: {category}</p>

      {/* Button linking to product detail page */}
      <Link href={`/product/${id}`}>
        <button className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
