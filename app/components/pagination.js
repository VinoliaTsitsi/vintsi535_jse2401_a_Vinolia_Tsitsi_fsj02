import Link from 'next/link';

export default function Pagination({ currentPage }) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage + 1;

  return (
    <div className="flex justify-between items-center mt-8">
      {prevPage && (
        <Link href={`/products?page=${prevPage}`} className="bg-gray-300 px-4 py-2 rounded">
          Previous
        </Link>
      )}
      <Link href={`/products?page=${nextPage}`} className="bg-gray-300 px-4 py-2 rounded">
        Next
      </Link>
    </div>
  );
}
