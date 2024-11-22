package com.connectingfrontandback.model;

import java.util.List;

public class FavoriteRecipes {
    private boolean success;
    private List<String> favoriteRecipes;

    // Constructor
    public FavoriteRecipes(boolean success, List<String> favoriteRecipes) {
        this.success = success;
        this.favoriteRecipes = favoriteRecipes;
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public List<String> getFavoriteRecipes() {
        return favoriteRecipes;
    }

    public void setFavoriteRecipes(List<String> favoriteRecipes) {
        this.favoriteRecipes = favoriteRecipes;
    }
}
