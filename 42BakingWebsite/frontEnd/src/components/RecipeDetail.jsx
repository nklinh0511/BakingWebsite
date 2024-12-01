import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]); // Treat comments as an array
  const [newComment, setNewComment] = useState('');

  // Fetch the recipe details based on the ID from the URL
  useEffect(() => {
    fetch(`http://localhost:8080/recipes/id/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);

        // Extract only the comment text from the JSON-like structure
        const rawComments = data.comments || '';
        try {
          // Parse JSON-like strings if needed
          const parsedComments = rawComments
            .split('\n')
            .map((comment) => {
              const parsed = JSON.parse(comment);
              return parsed.comments || ''; // Extract the "comments" field
            });
          setComments(parsedComments);
        } catch {
          // If parsing fails, treat as plain text
          setComments(rawComments.split('\n'));
        }
      })
      .catch((err) => console.error('Error fetching recipe:', err));
  }, [id]);

  // Handle adding a new comment
  const handleAddComment = (e) => {
    e.preventDefault();

    if (!newComment.trim()) return; // Don't add empty comments

    // Append the new comment to the existing comments
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    // Send the new comment to the server
    fetch(`http://localhost:8080/recipes/id/${id}/addcomment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comments: updatedComments.join('\n') }),
    }).catch((err) => console.error('Error adding comment:', err));

    setNewComment(''); // Clear the comment field
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">{recipe.name}</h2>
      <div className="flex items-center space-x-2">
        <div className="text-yellow-500">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < recipe.rating ? 'text-yellow-500' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500">({recipe.rating} stars)</p>
      </div>
      <p className="mt-2">{recipe.ingredients}</p>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Comments</h3>
        <form onSubmit={handleAddComment} className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-color-7 text-white rounded-md hover:bg-color-7">
            Add Comment
          </button>
        </form>

        <div className="mt-4">
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
