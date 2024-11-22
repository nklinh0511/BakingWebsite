import React, { useState } from 'react';

const SearchToggle = () => {
  const [searchMode, setSearchMode] = useState('name');

  const handleToggle = () => {
    setSearchMode((prevMode) => (prevMode === 'name' ? 'ingredients' : 'name'));
    console.log(searchMode);
  };

  return (
    <div className="search-toggle">
      <button
        onClick={handleToggle}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f0f0f0',
        }}
      >
        {searchMode === 'name' ? 'Search by Ingredients' : 'Search by Name'}
      </button>
    </div>
  );
};

export default SearchToggle;
