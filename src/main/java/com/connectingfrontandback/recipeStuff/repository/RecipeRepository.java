package com.connectingfrontandback.recipeStuff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.connectingfrontandback.recipeStuff.model.Recipe;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByNameContainingIgnoreCase(String name);
    List<Recipe> findByIngredientsContainingIgnoreCase(String ingredient);
}
