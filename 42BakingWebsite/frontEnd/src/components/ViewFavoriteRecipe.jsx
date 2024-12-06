import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the user's favorite recipes
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          console.error('User not logged in');
          return;
        }

        const response = await fetch(`http://localhost:8080/student/favorites?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          setFavoriteRecipes(data); // Assuming the response is an array of favorite recipes
        } else {
          console.error('Failed to fetch favorite recipes');
        }
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  // Handle navigating to the recipe detail page
  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/id/${recipeId}`);
  };

  // Render the list of favorite recipes
  if (loading) {
    return <div>Loading favorite recipes...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Your Favorite Recipes</h2>
      <div className="mt-6">
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-all mb-4"
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <h3 className="font-poppins text-xl font-bold text-color-6 hover:text-color-2 cursor-pointer">
                {recipe.name}
              </h3>
              <div className="flex items-center space-x-1">
                {renderStars(recipe.rating)} {/* You can use the renderStars function here */}
              </div>
              <p className="text-color-6 font-poppins">{recipe.ingredients}</p>
            </div>
          ))
        ) : (
          <p>You don't have any favorite recipes yet.</p>
        )}
      </div>
    </div>
  );
};

// Helper function to render stars based on the rating
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

export default FavoriteRecipes;
