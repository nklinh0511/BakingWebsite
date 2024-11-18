package com.connectingfrontandback.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectingfrontandback.model.Recipe;
import com.connectingfrontandback.model.User;
import com.connectingfrontandback.repository.RecipeRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository; // Injected by Spring

    public List<Recipe> searchByName(String name) {
        return recipeRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Recipe> searchByIngredient(String ingredient) {
        return recipeRepository.findByIngredientsContainingIgnoreCase(ingredient);
    }

    public Recipe addRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);  // Return the saved recipe
    }

     public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();  
    }
}
