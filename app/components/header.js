// components/Header.js
import Link from 'next/link';

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
