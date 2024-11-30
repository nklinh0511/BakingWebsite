import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-64 object-cover" src={recipe.image} alt={recipe.title} />
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">{recipe.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{recipe.description}</p>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700">Ingredients:</h3>
          <ul className="list-inside list-disc text-gray-600 text-sm">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700">Instructions:</h3>
          <ol className="list-inside list-decimal text-gray-600 text-sm">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <strong>Cook Time:</strong> {recipe.cookTime} minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
