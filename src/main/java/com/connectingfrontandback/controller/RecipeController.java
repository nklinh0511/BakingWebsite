package com.connectingfrontandback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.connectingfrontandback.model.Recipe;
import com.connectingfrontandback.repository.ApiResponse;
import com.connectingfrontandback.service.APIService;
import com.connectingfrontandback.service.RecipeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private final RecipeService recipeService;

    // @Autowired
    // private final APIService apiService;

    public RecipeController(RecipeService recipeService, APIService apiService) {
        this.recipeService = recipeService;
        // this.apiService = apiService;
    }

    @GetMapping("/searchByname")
    public Object searchRecipesByName(@RequestParam String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name parameter cannot be null or empty");
        }

        // Split the name by commas and trim any extra spaces
        List<String> nameList = List.of(name.split("\\s*,\\s*"));

        // Search the database first
        List<Recipe> dbResults = recipeService.searchByName(nameList);

        return dbResults;
    }

    @GetMapping("/searchByingredient")
    public Object searchRecipesByIngredient(@RequestParam String ingredient) {
        if (ingredient == null || ingredient.trim().isEmpty()) {
            throw new IllegalArgumentException("Ingredient parameter cannot be null or empty");
        }

        // Search the database first
        List<Recipe> dbResults = recipeService.searchByIngredient(ingredient);
        return dbResults; // Return database results if found
    }

    // Adds user entered data to database - calls addRecipe from recipeservice
    @PostMapping("/add")
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        return recipeService.addRecipe(recipe);
    }

    @GetMapping("/getAllRecipes")
    public List<Recipe> getAllRecipesss() {
        return recipeService.getAllRecipes();
    }

    // Get recipe by ID
    @GetMapping("/id/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable long id) {
        Optional<Recipe> recipe = recipeService.getRecipeById(id);
        if (recipe.isPresent()) {
            return ResponseEntity.ok(recipe.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse(false, "Recipe not found"));
    }

    // Add a comment to a recipe
    @PostMapping("/id/{id}/addcomment")
    public ResponseEntity<?> addComment(@PathVariable long id, @RequestBody String comment) {
        boolean isAdded = recipeService.addCommentToRecipe(id, comment);
        if (isAdded) {
            return ResponseEntity.ok(new ApiResponse(true, "Comment added successfully"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse(false, "Failed to add comment"));
    }

    // Get all comments of a recipe by its ID
    @GetMapping("/id/{id}/comments")
    public ResponseEntity<?> getCommentsByRecipeId(@PathVariable long id) {
        String comments = recipeService.getComments(id);
        if (comments != null && !comments.isEmpty()) {
            String[] commentsArray = comments.split("\n"); // Split by newline
            return ResponseEntity.ok(commentsArray); // Return as an array
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse(false, "No comments found for the recipe"));

    }

    // ** New: Add a rating to a recipe **
    @PostMapping("/id/{id}/addRating")
    public ResponseEntity<?> addRatingToRecipe(@PathVariable long id, @RequestBody int rating) {
        if (rating < 1 || rating > 5) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Rating must be between 1 and 5"));
        }

        boolean isAdded = recipeService.addRatingToRecipe(id, rating);
        if (isAdded) {
            return ResponseEntity.ok(new ApiResponse(true, "Rating added successfully"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse(false, "Failed to add rating"));
    }

    // Get the average rating of a recipe
    @GetMapping("/id/{id}/averageRating")
    public ResponseEntity<?> getAverageRatingForRecipe(@PathVariable long id) {
        Optional<Recipe> recipe = recipeService.getRecipeById(id);
        if (recipe.isPresent()) {
            double averageRating = recipe.get().getRating();
            return ResponseEntity.ok(averageRating);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse(false, "Recipe not found"));
    }

    // If you want overal ratings from every recipe ?
    // @GetMapping("/averageWebsiteRating")
    // public ResponseEntity<?> getOverallWebsiteRating() {
    // List<Recipe> allRecipes = recipeService.getAllRecipes(); // Get all recipes
    // from the database
    // if (allRecipes.isEmpty()) {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND)
    // .body(new ApiResponse(false, "No recipes found"));
    // }

    // double totalRating = 0;
    // int totalRatingCount = 0;

    // // Iterate through all recipes and calculate the total ratings and the count
    // of
    // // ratings
    // for (Recipe recipe : allRecipes) {
    // // Calculate the overall rating for each recipe
    // recipe.calculateOverallRating(); // Ensure this updates the recipe's rating
    // totalRating += recipe.getRating(); // Add this recipe's rating to the total
    // totalRatingCount++; // Increment the number of recipes that contributed a
    // rating
    // }

    // // Calculate the average rating for all recipes
    // double averageRating = totalRating / totalRatingCount;

    // return ResponseEntity.ok(averageRating); // Return the overall average rating
    // }
}