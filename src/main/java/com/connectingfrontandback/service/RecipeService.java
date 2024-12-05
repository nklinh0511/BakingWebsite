package com.connectingfrontandback.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.connectingfrontandback.model.Recipe;
import com.connectingfrontandback.repository.RecipeRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    // searches a user entered recipe by name
    public List<Recipe> searchByName(List<String> names) {
        // Use the repository method that accepts a list of names
        return recipeRepository.findByNameIn(names); // This method uses the IN query to match multiple names
    }

    public List<Recipe> searchByIngredient(String ingredients) {
        String[] ingredientList = ingredients.split(","); // Split by commas to handle each ingredient
        List<Recipe> results = new ArrayList<>();

        for (String ingredient : ingredientList) {
            results.addAll(recipeRepository.findByIngredientsContainingIgnoreCase(ingredient.trim()));
        }

        return results;
    }

    // adds a user ented recipe
    public Recipe addRecipe(Recipe recipe) {
        return recipeRepository.save(recipe); // Return the saved recipe
    }

    // gets a list of all user entered recipes
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(long id) {
        return recipeRepository.findById(id);
    }

    public String getComments(Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        if (recipe.isPresent()) {
            return recipe.get().getComments(); // Return the single comments string
        }
        return ""; // Return an empty string if no comments exist
    }

    public boolean addRating(long id, int rating) {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        Optional<Recipe> recipeOptional = recipeRepository.findById(id);
        if (recipeOptional.isPresent()) {
            Recipe recipe = recipeOptional.get();

            // Update total ratings and count
            int newTotalRating = recipe.getTotalRating() + rating;
            int newRatingCount = recipe.getRatingCount() + 1;

            recipe.setTotalRating(newTotalRating);
            recipe.setRatingCount(newRatingCount);

            // Calculate and update the average rating as an integer
            int averageRating = Math.round((float) newTotalRating / newRatingCount);
            recipe.setRating(averageRating);

            recipeRepository.save(recipe);
            return true;
        }
        return false;
    }

    public int getOverallRating(long id) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(id);
        if (recipeOptional.isPresent()) {
            return recipeOptional.get().getRating();
        }
        return 0;
    }

    public boolean addCommentAndRating(long id, String comment, int rating) {
        boolean commentAdded = addCommentToRecipe(id, comment);
        boolean ratingAdded = addRating(id, rating);
        return commentAdded && ratingAdded;
    }

    public boolean addCommentToRecipe(long id, String comment) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(id);
        if (recipeOptional.isPresent()) {
            Recipe recipe = recipeOptional.get();

            // Get the current comments (or an empty string if there are none)
            String currentComments = recipe.getComments();
            if (currentComments == null || currentComments.isEmpty()) {
                recipe.setComments(comment); // First comment
            } else {
                recipe.setComments(currentComments + "\n" + comment); // Append the new comment
            }

            // Save the updated recipe
            recipeRepository.save(recipe);
            return true;
        }
        return false;
    }

    public boolean addRatingToRecipe(long id, int rating) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(id);
        if (recipeOptional.isPresent()) {
            Recipe recipe = recipeOptional.get();

            // Update totalRating and ratingCount
            recipe.setTotalRating(recipe.getTotalRating() + rating);
            recipe.setRatingCount(recipe.getRatingCount() + 1);

            // Call the method to calculate the overall rating
            recipe.calculateOverallRating();

            // Save the updated recipe
            recipeRepository.save(recipe);
            return true;
        }
        return false;
    }

}
