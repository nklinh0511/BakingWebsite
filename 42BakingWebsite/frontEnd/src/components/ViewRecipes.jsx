import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const ViewRecipes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);  // State to store recipes
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null);     // State for errors
  const itemsPerPage = 15;  // Number of recipes per page

  // Fetch recipes when the component mounts

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8080/recipes/getAllRecipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data); // Set recipes after fetching
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRecipes(); // Call the function to fetch data when the component mounts
  }, []);

  // Paginate the recipes
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);  // Slice the recipes

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle next and previous buttons
  const handleNextPage = () => {
    if (currentPage < Math.ceil(recipes.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for pagination
  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Render loading, error, or recipes based on the state
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-color-7 text-white font-semibold rounded-l-lg hover:bg-color-7 disabled:bg-gray-300 disabled:text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${currentPage === number ? 'bg-color-7 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-color-7 transition-colors duration-300`}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-color-7 text-white font-semibold rounded-r-lg hover:bg-color-7 disabled:bg-gray-300 disabled:text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ViewRecipes;
