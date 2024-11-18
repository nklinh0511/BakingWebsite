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
    fetch('http://localhost:8080/recipes/getAllRecipes')  // Assuming you have an endpoint to get all recipes
      .then(response => response.json())
      .then(data => setRecipes(data))  // Set state with list of recipes
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div>
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Recipe Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Ingredients (comma separated)" 
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button type="submit">Add Recipe</button>
      </form>

      {/* Display the newly added recipe */}
      {recipe && (
        <div>
          <h3>Recipe Added:</h3>
          <p>Name: {recipe.name}</p>
          <p>Ingredients: {recipe.ingredients}</p>
        </div>
      )}

      {/* Display all recipes */}
      <h3>All Recipes</h3>
      <div>
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe.id}>
              <h4>{recipe.name}</h4>
              <p>{recipe.ingredients}</p>
            </div>
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
    </div>
  );
}

export default RecipeForm;
