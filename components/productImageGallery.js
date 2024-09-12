// components/ProductImageGallery.js

import Image from "next/image";
const ProductImageGallery = ({ images }) => {

    const getImageSrc = () => {
        if (!imageError && product.thumbnail?.startsWith('http')) return product.thumbnail;
        if (!imageError && product.images && product.images.length > 0 && product.images[0]?.startsWith('http')) return product.images[0];
        return '/placeholder-image.jpg'; // Fallback image should be in the public directory
      };
    // Implement a carousel or image slider here
    return (
      <div className="image-gallery">
        {images.map((img, index) => (
          <Image key={index} src={img} alt={`Product image ${index + 1}`} />
        ))}
      </div>
    );
  };

  export default ProductImageGallery;