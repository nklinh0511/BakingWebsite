import React, { useState } from "react";

const StarRating = ({id}) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = (value) => {
    setRating(value);
  };

  const handleHover = (value) => {
    setHovered(value);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setMessage("Please select a rating before submitting!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`http://localhost:8080/recipes/id/${id}/addRating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rating),
      });

      if (response.ok) {
        setMessage("Rating submitted successfully!");
        setRating(0); // Reset the rating after successful submission
      } else {
        setMessage("Failed to submit the rating. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred while submitting the rating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 font-poppins">
      <div className="flex space-x-1">
        {Array.from({ length: 5 }, (_, index) => index + 1).map((value) => (
          <span
            key={value}
            className={`text-4xl cursor-pointer ${
              hovered >= value || rating >= value ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleHover(value)}
            onMouseLeave={handleMouseLeave}
          >
            &#9733;
          </span>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className={`px-4 py-2 text-white bg-color-7 rounded hover:bg-color-6 font-poppins${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Rating"}
      </button>
      {message && <p className="text-sm text-gray-600 mt-2 font-poppins">{message}</p>}
    </div>
  );
};

export default StarRating;
