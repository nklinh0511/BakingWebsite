import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const navigate = useNavigate();


  const handleAddToFavorites = async (recipe) => {
    setIsFavorite((prev) => !isFavorite);
    const user = localStorage.getItem("username"); // Retrieve username from session/localStorage if necessary
    console.log(user);
  
    fetch('http://localhost:8080/student/addfavoriterecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // Ensure the cookie is included in the request
      body: JSON.stringify({
        recipeName: recipe, // Ensure you're passing the recipe name, not the entire recipe object
        user: user,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Recipe added to favorites:', data);
      })
      .catch(error => {
        console.error('Error adding to favorites:', error);
      });
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
      <div>
        <button onClick={() => handleAddToFavorites(recipe.name)}>

    {isFavorite ? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-color-2">
      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-color-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    )}  
    </button>
    </div>


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
