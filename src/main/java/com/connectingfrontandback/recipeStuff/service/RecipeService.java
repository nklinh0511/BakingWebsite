package com.connectingfrontandback.recipeStuff.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectingfrontandback.recipeStuff.model.Recipe;
import com.connectingfrontandback.recipeStuff.repository.RecipeRepository;

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
}
