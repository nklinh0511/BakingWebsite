package com.connectingfrontandback.service;

import java.util.ArrayList;
import java.util.List;

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
}
