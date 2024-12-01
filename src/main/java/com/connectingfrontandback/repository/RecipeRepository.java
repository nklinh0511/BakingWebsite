package com.connectingfrontandback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.connectingfrontandback.model.Recipe;


import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByNameIn(List<String> names);

    Optional<Recipe> findById(long id);

    // Use LIKE to match any ingredient in the list
    List<Recipe> findByIngredientsContainingIgnoreCase(String ingredient);

}
