import { useState } from "react";

const commentData = {
    recipeName: recipeName,
    rating: rating,
    comment: comment
};

const Ratings = () => {
    const [recipeNameInput, setRecipeNameInput] = useState("");
    const [commentInput, setCommentInput] = useState("");
  return (
    <>
    <div className="container">
        <h1>Recipe Comments</h1>
        <form id="commentForm">
            <label for="recipeName">Recipe Name:</label>
            <input type="text" value={recipeNameInput} onChange={(e) => setRecipeNameInput(e.target.value)} id="recipeName" required></input>

            <label for="rating">Rating (1-5):</label>
            <input type="number" id="rating" min="1" max="5" required></input>

            <label for="comment">Comment:</label>
            <textarea id="comment" rows="4" value={commentInput} onChange={(e) => setCommentInput(e.target.value)}  required></textarea>

            <button type="submit">Submit</button>
        </form>

        <div id="commentsSection">
            <h2>User Comments</h2>
            <ul id="commentsList"></ul>
        </div>
    </div>
    </>
  )
}

export default Ratings
