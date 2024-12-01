import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';  // Outlined heart icon (unfavorited)
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid'; // Filled heart icon (favorited)


const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const navigate = useNavigate();

  // Function to navigate to the recipe detail page
  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
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
         {/* Favorite Icon */}
         <div className="mt-0 mr-3 flex right-1 absolute">
          <button onClick={toggleFavorite} aria-label="Toggle Favorite">
            {isFavorite ? (
              <SolidHeartIcon className="w-6 h-6 text-color-5" />
            ) : (
              <HeartIcon className="w-6 h-6 text-color-5 hover:text-color-2 transition-colors duration-200" />
            )}
          </button>
        </div>

      <h3 className="font-poppins cursor-pointer text-xl font-bold text-color-6 hover:text-color-2" onClick={handleClick}>{recipe.title}</h3>
      <div className="flex items-center space-x-1">
        {renderStars(recipe.rating)} {/* Show stars based on rating */}
      </div>
      <div className="mt-4">
          <h3 className="font-poppins text-lg font-medium text-color-6">Ingredients:</h3>
          <ul className="font-poppins list-inside list-disc text-color-6 text-sm">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

       
    </div>
  );
};

export default RecipeCard;
