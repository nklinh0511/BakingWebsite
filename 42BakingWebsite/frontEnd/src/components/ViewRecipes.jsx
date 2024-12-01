import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';


const ViewRecipes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);  // State to store recipes
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null);     // State for errors
  const itemsPerPage = 15;
  const totalPages = Math.ceil(sampleRecipes.length / itemsPerPage);

  // Paginate the recipes
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = sampleRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle next and previous buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    // Fetch recipes from your backend API
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8080/recipes/getAllRecipes');
        
        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        setRecipes(data); // Set the recipes state with the fetched data
      } catch (err) {
        setError(err.message); // Handle errors if the fetch fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRecipes(); // Call the function to fetch data when the component mounts
  }, []); // Empty dependency array to run this effect only once when the component mounts

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
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-l-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
        >
          previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${currentPage === number ? 'bg-color-7 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-400 transition-colors duration-300`}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-color-7 text-white font-semibold rounded-r-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
        >
          next
        </button>
      </div>
    </div>
  );
};

export default ViewRecipes;
