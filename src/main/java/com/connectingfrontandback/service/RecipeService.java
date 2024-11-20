package com.connectingfrontandback.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectingfrontandback.model.Recipe;
import com.connectingfrontandback.repository.RecipeRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository; 

    //searches a user entered recipe by name
    public List<Recipe> searchByName(String name) {
        return recipeRepository.findByName(name);
    }

    //searches a user enteered recipe by ingredient
    public List<Recipe> searchByIngredient(String ingredient) {
        return recipeRepository.findByIngredientsContainingIgnoreCase(ingredient);
    }

    //adds a user ented recipe
    public Recipe addRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);  // Return the saved recipe
    }

    //gets a list of all user entered recipes
     public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();  
    }
}
