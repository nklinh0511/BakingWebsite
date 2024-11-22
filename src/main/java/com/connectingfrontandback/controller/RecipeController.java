package com.connectingfrontandback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.connectingfrontandback.model.Recipe;
import com.connectingfrontandback.service.APIService;
import com.connectingfrontandback.service.RecipeService;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private final RecipeService recipeService;

    @Autowired
    private final APIService apiService;

    public RecipeController(RecipeService recipeService, APIService apiService) {
        this.recipeService = recipeService;
        this.apiService = apiService;
    }

    @GetMapping("/searchByname")
    public Object searchRecipesByName(@RequestParam String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name parameter cannot be null or empty");
        }

        // Search the database first
        List<Recipe> dbResults = recipeService.searchByName(name);
        // if (!dbResults.isEmpty()) {
            return dbResults; // Return database results if found
        // }

        // Query the external API if no database results
        // return apiService.searchRecipesByName(name);
    }

    @GetMapping("/searchByingredient")
    public Object searchRecipesByIngredient(@RequestParam String ingredient) {
        if (ingredient == null || ingredient.trim().isEmpty()) {
            throw new IllegalArgumentException("Ingredient parameter cannot be null or empty");
        }

        // Search the database first
        List<Recipe> dbResults = recipeService.searchByIngredient(ingredient);
        // if (!dbResults.isEmpty()) {
            return dbResults; // Return database results if found
        // } 

        // Querys the external API if no database results
        // return apiService.searchRecipesByIngredient(ingredient);
    }

    // Adds user entered data to database - calls addRecipe from recipeservice
    @PostMapping("/add")
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        return recipeService.addRecipe(recipe);
    }

    @GetMapping("/getAllRecipes")
    public List<Recipe> getMethodName() {
        return recipeService.getAllRecipes();
    }

}
