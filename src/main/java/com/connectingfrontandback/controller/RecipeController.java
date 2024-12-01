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
    public List<Recipe> getMethodName() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable long id) {
        Recipe recipe = recipeService.getRecipeById(id);
        if (recipe != null) {
            return ResponseEntity.ok(recipe); // Return the recipe if found
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse(false, "Recipe not found"));
    }
}
