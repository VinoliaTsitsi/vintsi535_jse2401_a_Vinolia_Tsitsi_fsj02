import Link from 'next/link';

/**
 * Pagination component for navigating through pages of products.
 *
 * This component renders "Previous" and "Next" buttons based on the current page.
 * The "Previous" button is only displayed if there is a previous page available.
 * The "Next" button is always displayed and navigates to the next page.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.currentPage - The current page number.
 * 
 * @returns {JSX.Element} The Pagination component.
 *
 * @example
 * return (
 *   <Pagination currentPage={1} />
 * )
 */
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
