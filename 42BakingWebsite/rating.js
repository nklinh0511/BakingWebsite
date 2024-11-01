document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const recipeName = document.getElementById('recipeName').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    // Create a comment object
    const commentData = {
        recipeName: recipeName,
        rating: rating,
        comment: comment
    };

    // Send the data to the server
    fetch('/submit-comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Create a new comment item
            const commentItem = document.createElement('li');
            commentItem.classList.add('comment-item');
            commentItem.innerHTML = `<strong>${recipeName}</strong> (Rating: ${rating})<br>${comment}`;

            // Append to comments list
            document.getElementById('commentsList').appendChild(commentItem);

            // Clear the form
            document.getElementById('commentForm').reset();
        } else {
            alert('Error saving comment!');
        }
    });
});
