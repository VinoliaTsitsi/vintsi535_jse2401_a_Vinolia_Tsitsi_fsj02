'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductImageGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: index => setCurrentImage(index),
    arrows: true,
  };

  const handleImageError = () => setImageError(true);

  const getImageSrc = (img) => {
    return imageError || !img.startsWith('http') ? '/placeholder-image.jpg' : img;
  };

  return (
    <div className="product-image-gallery relative">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="relative w-full h-80">
            <Image
              src={getImageSrc(img)}
              alt={`Product image ${index + 1}`}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
              onError={handleImageError}
            />
          </div>
        ))}
      </Slider>
      {images.length > 1 && (
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            className="bg-white p-2 rounded-full shadow-lg"
            onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
          >
            &lt;
          </button>
        </div>
      )}
      {images.length > 1 && (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            className="bg-white p-2 rounded-full shadow-lg"
            onClick={() => setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
