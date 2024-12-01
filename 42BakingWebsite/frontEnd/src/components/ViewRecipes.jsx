import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";


const sampleRecipes = [
  { title: 'Spaghetti Bolognese', ingredients: ['200g Spaghetti', '100g Ground beef', '1 onion', '2 cloves garlic', 'Tomato sauce', 'Oregano'] },
  { title: 'Chicken Alfredo', ingredients: ['200g Chicken', '200g Pasta', 'Cream', 'Garlic', 'Parmesan'] },
  { title: 'Vegetable Stir Fry', ingredients: ['Broccoli', 'Carrots', 'Bell peppers', 'Soy sauce', 'Ginger'] },
  { title: 'Beef Tacos', ingredients: ['Ground beef', 'Taco shells', 'Lettuce', 'Tomato', 'Cheese'] },
  { title: 'Pancakes', ingredients: ['Flour', 'Eggs', 'Milk', 'Baking powder', 'Butter'] },
  { title: 'Grilled Cheese Sandwich', ingredients: ['Bread', 'Cheese', 'Butter'] },
  { title: 'Caesar Salad', ingredients: ['Lettuce', 'Croutons', 'Parmesan', 'Caesar dressing'] },
  { title: 'Fried Rice', ingredients: ['Rice', 'Egg', 'Peas', 'Carrot', 'Soy sauce'] },
  { title: 'Lemon Chicken', ingredients: ['Chicken breast', 'Lemon', 'Garlic', 'Thyme'] },
  { title: 'Spaghetti Carbonara', ingredients: ['Spaghetti', 'Bacon', 'Eggs', 'Parmesan'] },
  { title: 'Beef Stew', ingredients: ['Beef', 'Potatoes', 'Carrots', 'Onions', 'Broth'] },
  { title: 'Fish Tacos', ingredients: ['Fish fillets', 'Tortillas', 'Lime', 'Cabbage', 'Salsa'] },
  { title: 'Chocolate Cake', ingredients: ['Flour', 'Cocoa powder', 'Sugar', 'Eggs', 'Butter'] },
  { title: 'Vegetable Soup', ingredients: ['Carrots', 'Potatoes', 'Celery', 'Onions', 'Tomatoes'] },
  { title: 'Chicken Curry', ingredients: ['Chicken', 'Curry powder', 'Coconut milk', 'Rice'] },
  { title: 'Tacos', ingredients: ['Taco shells', 'Ground beef', 'Cheese', 'Lettuce', 'Tomato'] }
];

const ViewRecipes = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-l-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
        >
          <ChevronLeftIcon className="w-6 h-6" />
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
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ViewRecipes;
