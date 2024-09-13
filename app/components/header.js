// components/Header.js

import Link from 'next/link';

/**
 * Header component for the application.
 *
 * This component renders the header section of the page, which includes
 * the application name with a link back to the home page.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
const Header = () => {
  return (
    <header className="bg-sky-400 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">
            SHOPQUICK
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
