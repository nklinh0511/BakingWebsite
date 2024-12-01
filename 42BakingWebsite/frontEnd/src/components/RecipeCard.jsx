import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const navigate = useNavigate();


  // Function to handle adding the recipe to favorites
  const handleAddToFavorites = async () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      console.log(isFavorite);

    try {
      // POST request to add the recipe to favorites
      const response = await fetch("http://localhost:8080/recipes/addfavoriterecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeName: recipe.name, // Pass the recipe name to the backend
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Recipe added to favorites:", data);  // Log success message from the backend
        setIsFavorite(true); // Mark as favorite after successful request
      } else {
        console.error("Error adding to favorites:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Function to navigate to the recipe detail page
  const handleClick = () => {
    navigate(`/recipe/id/${recipe.id}`);
  };

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-500">★</span>);  // Filled star
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);  // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="relative p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-all">
      <div><button onClick={handleAddToFavorites(recipe.name)}>Favorite</button></div>


      <h3 className="font-poppins cursor-pointer text-xl font-bold text-color-6 hover:text-color-2" onClick={handleClick}>{recipe.name}</h3>
      <div className="flex items-center space-x-1">
        {renderStars(recipe.rating)} {/* Show stars based on rating */}
      </div>
      <div className="mt-4">
          <h3 className="font-poppins text-lg font-medium text-color-6">Ingredients:</h3>
          <p className="text-color-6 font-poppins">{recipe.ingredients}</p>
        </div>

       
    </div>
  );
};

export default RecipeCard;
