import Image from 'next/image';
import { fetchProduct } from '@/lib/api';

export default async function  ProductDetail ({params }) {
  const product = await fetchProduct(params.id)

  if (!product) return <p>Product not found</p>;

  // const imageUrl = product.imageUrl ? product.imageUrl : '/default-image.jpg';
  // const altText = product.title ? product.title : 'Product Image';

  return (
    <div className='' >
      <h1>{product.title || 'No Title'}</h1>
      <p>{product.description || 'No description available.'}</p>
      <Image src={product.images} alt={product.tile}  width={600} height={400} />
      <p>Price: ${product.price || 'N/A'}</p>
      <p>Category: {product.category || 'N/A'}</p>
      <p>Tags: {product.tags ? product.tags.join(', ') : 'No tags'}</p>
      <p>Rating: {product.rating !== undefined ? product.rating : 'No rating'}</p>
      <p>Stock: {product.stock !== undefined ? product.stock : 'Unavailable'}</p>
      <div>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index}>
              <p>{review.name} ({review.date})</p>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   try {
//     const res = await fetch(`https://example.com/api/products/${id}`);
//     if (!res.ok) throw new Error('Product not found');
//     const product = await res.json();
//     return { props: { product } };
//   } catch (error) {
//     return { props: { product: null } };
//   }
// }


