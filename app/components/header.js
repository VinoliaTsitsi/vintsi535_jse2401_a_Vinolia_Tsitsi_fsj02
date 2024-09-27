'use client'; // Mark this component as a client-side component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation in App Router

const Header = ({ onCategoryChange, onSearchChange, onSortingChange }) => {
  const [categories, setCategories] = useState([]); // Categories fetched from API
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState('default');

  const router = useRouter();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://next-ecommerce-api.vercel.app/categories'); // Fetch from API
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the JSON data
        
        console.log('Categories fetched:', data); // Log the fetched data
        
        setCategories(data); // Set categories from API response
      } catch (error) {
        console.error('Failed to fetch categories:', error); // Handle errors
      }
    };

    fetchCategories(); // Call the function to fetch categories
  }, []); // Empty dependency array to run once on component mount


  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onCategoryChange(category); // Emit category change to parent component
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query); // Emit search query change to parent component
  };

  const handleSortingChange = (e) => {
    const sortingOption = e.target.value;
    setSorting(sortingOption);
    onSortingChange(sortingOption); // Emit sorting option change to parent component
  };

  return (
    <div className="navbar flex justify-between items-center p-4 bg-gray-100">
      <div className="logo text-lg font-bold text-blue-500">ShopQuick</div>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-filter px-2 py-1 border border-blue-500"
      >
        <option value="All categories">All categories</option>
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category}
            </option>
          ))
        ) : (
          <option disabled>Loading categories...</option>
        )}
      </select>
      <select
        value={sorting}
        onChange={handleSortingChange}
        className="sorting-filter px-2 py-1 border border-blue-500"
      >
        <option value="default">Sort by</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-blue-500 rounded-full"
        />
      </div>

    </div>
  );
};

export default Header;
