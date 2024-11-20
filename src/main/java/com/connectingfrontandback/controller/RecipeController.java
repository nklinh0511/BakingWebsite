package com.connectingfrontandback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.connectingfrontandback.model.Recipe;
import com.connectingfrontandback.service.RecipeService;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/searchByName")
    public List<Recipe> searchRecipesByName(@RequestParam String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name parameter cannot be null or empty");
        }
        return recipeService.searchByName(name);
    }

    @GetMapping("/searchByIngredient") 
    public List<Recipe> searchRecipesByIngredient(@RequestParam String ingredient) {
        if (ingredient == null || ingredient.trim().isEmpty()) {
            throw new IllegalArgumentException("Ingredient parameter cannot be null or empty");
        }
        return recipeService.searchByIngredient(ingredient);
    }

    @PostMapping("/add") 
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        return recipeService.addRecipe(recipe);
    }

    @GetMapping("/getAllRecipes")
    public List<Recipe> getMethodName() {
        return recipeService.getAllRecipes();
    }
    
}
