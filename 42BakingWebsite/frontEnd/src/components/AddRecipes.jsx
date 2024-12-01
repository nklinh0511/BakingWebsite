import React, { useState, useEffect } from 'react';

function RecipeForm() {
  const [recipe, setRecipe] = useState(null); // To store a single added recipe
  const [recipes, setRecipes] = useState([]); // To store the list of recipes
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');

  // Function to handle form submission (adding a new recipe)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      name: name,
      ingredients: ingredients
    };

    // Send the recipe data to the backend
    fetch('http://localhost:8080/recipes/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecipe),
    })
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
        console.log('Success:', data);  // Log the saved recipe
        setRecipe(data);  // Store the saved recipe in state to display
        setName('');  // Clear the form
        setIngredients('');
      })
      .catch((error) => console.error('Error:', error));
  };

  // Fetch the list of all recipes when the component mounts
  useEffect(() => {
    fetch('http://localhost:8080/recipes/getAllRecipes') 
      .then(response => response.json())
      .then(data => setRecipes(data))  // Set state with list of recipes
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-color-5 shadow-md rounded-3xl my-20 ">
      {/* Add Recipe Title */}
      <h2 className="text-3xl font-titan text-center text-white mb-6 drop-shadow-lg">Add a New Recipe</h2>

      {/* Form for adding a new recipe */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Name */}
        <div>
          <label htmlFor="name" className="block text-white font-bold font-poppins text-lg">Recipe Name</label>
          <input 
            id="name"
            type="text" 
            placeholder="Enter recipe name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="font-poppins w-full p-3 mt-2 border border-color-7 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-4"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label htmlFor="ingredients" className="block text-white font-poppins font-bold text-lg">Ingredients (comma separated)</label>
          <input 
            id="ingredients"
            type="text" 
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="font-poppins w-full p-3 mt-2 border border-color-7 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-4"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button 
            type="submit" 
            className="font-titan text-xl w-full py-3 bg-color-4 text-color-6 rounded-lg hover:bg-color-7 hover:text-white transition duration-200"
          >
            Add Recipe
          </button>
        </div>
      </form>

      {/* Display the newly added recipe */}
      {recipe && (
        <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">Recipe Added Successfully</h3>
          <p className="text-gray-800"><strong>Name:</strong> {recipe.name}</p>
          <p className="text-gray-800"><strong>Ingredients:</strong> {recipe.ingredients}</p>
        </div>
      )}

      {/* Display all recipes 
      <h3 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">All Recipes</h3>
      <div className="space-y-6">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe.id} className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800">{recipe.name}</h4>
              <p className="text-gray-700">{recipe.ingredients}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recipes available.</p>
        )}
      </div>
      */}
    </div>
  );
}

export default RecipeForm;
