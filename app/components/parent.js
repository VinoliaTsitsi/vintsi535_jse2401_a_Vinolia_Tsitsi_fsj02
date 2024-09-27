import { useState } from 'react';
import Header from './components/header';
import Products from './components/products';

const App = ({ initialProducts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [sorting, setSorting] = useState('default');

  return (
    <div>
      <Header
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onSortingChange={setSorting}
      />
      <Products
        initialProducts={initialProducts}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        sorting={sorting}
      />
    </div>
  );
};

export default App;
