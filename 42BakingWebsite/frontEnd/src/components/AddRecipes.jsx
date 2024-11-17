import { useState } from 'react';

const AddRecipes = () => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
  
    // Handle input changes
    const handleRecipeNameChange = (e) => {
      setRecipeName(e.target.value);
    };
  
    const handleIngredientsChange = (e) => {
      setIngredients(e.target.value);
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate form fields
      if (!recipeName || !ingredients) {
        setError('Please fill in all fields.');
        return;
      }
  
      setError(null);  // Clear error
  
      // Prepare the recipe data
      const recipeData = {
        name: recipeName,
        ingredients: ingredients.split(',').map((item) => item.trim()), // Split ingredients by commas
      };
  
      try {
        // Send POST request to the backend
        const response = await fetch('http://localhost:8080/recipes/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add recipe');
        }
  
        // Clear form and show success message
        setRecipeName('');
        setIngredients('');
        setSuccessMessage('Recipe added successfully!');
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <div>
        <h2>Add a New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="recipeName">Recipe Name</label>
            <input
              type="text"
              id="recipeName"
              value={recipeName}
              onChange={handleRecipeNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients (comma separated)</label>
            <input
              type="text"
              id="ingredients"
              value={ingredients}
              onChange={handleIngredientsChange}
              required
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    );
}

export default AddRecipes
