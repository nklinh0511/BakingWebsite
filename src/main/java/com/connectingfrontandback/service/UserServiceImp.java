package com.connectingfrontandback.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectingfrontandback.model.Recipe;
import com.connectingfrontandback.model.User;
import com.connectingfrontandback.repository.RecipeRepository;
import com.connectingfrontandback.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository studentRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public User saveStudent(User student) {
        // saves user information
        return studentRepository.save(student);
    }

    @Override
    public List<User> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public List<String> getFavoriteRecipes(String username) {
        User user = studentRepository.findById(username).orElse(null);
        if (user != null && user.getFavoriteRecipes() != null) {
            return Arrays.asList(user.getFavoriteRecipes().split(","));
        }
        return List.of();
    }

    // Add Favorite Recipe for a user
    @Override
    public boolean addFavoriteRecipe(String username, String recipeName) {
        User user = studentRepository.findById(username).orElse(null);
        if (user != null) {
            String currentFavorites = user.getFavoriteRecipes();
            String newFavorites = (currentFavorites == null || currentFavorites.isEmpty())
                    ? recipeName
                    : currentFavorites + "," + recipeName;
            user.setFavoriteRecipes(newFavorites);
            studentRepository.save(user);
            return true;
        }
        return false;
    }

 
}