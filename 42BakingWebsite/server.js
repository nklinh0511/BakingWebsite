const express = require('express');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files
app.use(express.json());

// Serve the rating details page
app.get('/rating', (req, res) => {
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

// Define headers for CSV writing
const csvWriterInstance = csvWriter({
    path: 'BakingRecipes.csv',
    header: [
        {id: 'Recipe Name', title: 'Recipe Name'},
        {id: 'Ingredients', title: 'Ingredients'},
        {id: 'Rating', title: 'Rating'},
        {id: 'Comment', title: 'Comment'}
    ],
    append: true
});

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
app.get('/get-recipes', (req, res) => {
    const recipeName = req.query.name.toLowerCase(); // Convert to lowercase for case-insensitive search
    const results = [];

    fs.createReadStream('BakingRecipes.csv')
        .pipe(csv())
        .on('data', (data) => {
            if (data['Recipe Name'].toLowerCase().includes(recipeName)) { // Check for partial match
                results.push(data);
            }
        })
        .on('end', () => {
            if (results.length > 0) {
                const recipes = results.map(recipe => ({
                    name: recipe['Recipe Name'],
                    ingredients: recipe.Ingredients.split(','), // Assuming ingredients are comma-separated
                    ratings: recipe.Rating ? recipe.Rating.split(', ') : [], // Split ratings
                    comments: recipe.Comment ? recipe.Comment.split(' | ') : [] // Split comments
                }));
                res.json(recipes);
            } else {
                res.json(null); // No recipes found
            }
        });
});

// Route to serve all recipes for display in recipes.html
app.get('/get-all-recipes', (req, res) => {
    const recipes = [];

    fs.createReadStream('./BakingRecipes.csv')
        .pipe(csv())
        .on('data', (data) => {
            const recipe = {
                name: data['Recipe Name'],
                ingredients: data.Ingredients ? data.Ingredients.split(',') : [],
                ratings: data.Rating ? data.Rating.split(', ') : [],
                comments: data.Comment ? data.Comment.split(' | ') : []
            };
            recipes.push(recipe);
        })
        .on('end', () => {
            res.json(recipes);
        });
});

// Serve recipes.html as root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/recipes.html');
});

// Route to upload a new recipe
app.post('/upload-recipe', (req, res) => {
    const { recipeName, ingredients, rating = '', comment = '' } = req.body;

    // Ensure required fields are present
    if (!recipeName || !ingredients) {
        return res.status(400).json({ error: 'Recipe name and ingredients are required.' });
    }

    // Format the new recipe record
    const newRecipe = {
        'Recipe Name': recipeName,
        'Ingredients': ingredients,
        'Rating': rating,
        'Comment': comment
    };

    // Append the new recipe to the CSV file
    csvWriterInstance.writeRecords([newRecipe])
        .then(() => {
            res.status(200).json({ message: 'Recipe uploaded successfully!' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to upload recipe.' });
        });
});

// Serve uploadRecipe.html as a static file
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploadRecipe.html'));
});

//
app.get('/search-recipes', (req, res) => {
    // Split input string by commas and trim whitespace around each ingredient
    const ingredients = req.query.ingredient
        .split(',')
        .map(i => i.toLowerCase().trim());

    const results = [];

    fs.createReadStream('BakingRecipes.csv')
        .pipe(csv())
        .on('data', (row) => {
            // Convert recipe ingredients to lowercase and split into an array
            const recipeIngredients = row.Ingredients ? row.Ingredients.toLowerCase().split(',').map(i => i.trim()) : [];
            
            // Check if all specified ingredients are present in recipeIngredients
            const containsAllIngredients = ingredients.every(ingredient => recipeIngredients.includes(ingredient));
            
            if (containsAllIngredients) {
                const ratings = row.Rating ? row.Rating.split(', ') : [];
                const comments = row.Comment ? row.Comment.split(' | ') : [];
                
                results.push({
                    name: row['Recipe Name'],
                    ingredients: recipeIngredients,
                    ratings: ratings,
                    comments: comments
                });
            }
        })
        .on('end', () => {
            res.json(results); // Send filtered recipes back to client
        });
});


// Serve the HTML page
app.use(express.static('public')); // Assuming searchByIngredient.html is in the "public" folder

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
