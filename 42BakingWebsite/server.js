const express = require('express');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files

// Serve the rating.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'rating.html'));
});

// Serve the recipe details page
app.get('/recipeDetails', (req, res) => {
    res.sendFile(path.join(__dirname, 'recipeDetails.html'));
});

// CSV file path
const csvFilePath = path.join(__dirname, 'BakingRecipes.csv');

// Function to check if recipe exists in the CSV file
const checkRecipeExists = (recipeName) => {
    return new Promise((resolve, reject) => {
        const recipes = new Set(); // Use a Set for unique recipe names
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                recipes.add(row['Recipe Name']);
            })
            .on('end', () => {
                resolve(recipes.has(recipeName)); // Check if the recipe exists
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

// Function to append comment and rating to the existing recipe
const appendCommentToRecipe = (recipeName, rating, comment) => {
    const updatedRecords = [];
    let recipeFound = false;

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                if (row['Recipe Name'] === recipeName) {
                    recipeFound = true;

                    // Append new rating and comment to existing values
                    row['Rating'] = row['Rating'] ? `${row['Rating']}, ${rating}` : rating; // Append rating
                    row['Comment'] = row['Comment'] ? `${row['Comment']} | ${comment}` : comment; // Append comment
                }
                updatedRecords.push(row);
            })
            .on('end', () => {
                if (recipeFound) {
                    // Write updated records back to CSV
                    const csvWriter = createObjectCsvWriter({
                        path: csvFilePath,
                        header: [
                            { id: 'Recipe Name', title: 'Recipe Name' },
                            { id: 'Ingredients', title: 'Ingredients' }, // Preserve the Ingredients column
                            { id: 'Rating', title: 'Rating' },
                            { id: 'Comment', title: 'Comment' }
                        ],
                        append: false // Overwrite the file
                    });
                    csvWriter.writeRecords(updatedRecords)
                        .then(() => resolve(true))
                        .catch((error) => reject(error));
                } else {
                    resolve(false); // Recipe not found
                }
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

// Endpoint to submit comments
app.post('/submit-comment', async (req, res) => {
    const { recipeName, rating, comment } = req.body;

    try {
        const recipeExists = await checkRecipeExists(recipeName);

        if (recipeExists) {
            const success = await appendCommentToRecipe(recipeName, rating, comment);
            if (success) {
                res.json({ success: true, message: 'Comment added successfully.' });
            } else {
                res.json({ success: false, message: 'Error updating comment.' });
            }
        } else {
            res.json({ success: false, message: 'Recipe does not exist.' });
        }
    } catch (error) {
        console.error('Error handling comment submission:', error);
        res.json({ success: false, message: 'An error occurred.' });
    }
});

// Endpoint to get recipe details
app.get('/get-recipe', (req, res) => {
    const recipeName = req.query.name.trim().toLowerCase();
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
            // Normalize recipe name from CSV for comparison
            const normalizedRecipeName = data['Recipe Name'] ? data['Recipe Name'].trim().toLowerCase() : '';
            if (normalizedRecipeName === recipeName) {
                results.push(data);
            }
        })
        .on('end', () => {
            if (results.length > 0) {
                const recipe = results[0];
                // Split the ratings and comments into arrays
                const ratings = recipe.Rating ? recipe.Rating.split(', ') : []; // Split ratings
                const comments = recipe.Comment ? recipe.Comment.split(' | ') : []; // Split comments
                
                res.json({
                    name: recipe['Recipe Name'],
                    ingredients: recipe.Ingredients.split(','), // Assuming ingredients are comma-separated
                    ratings: ratings,
                    comments: comments
                });
            } else {
                res.json(null); // No recipe found
            }
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
