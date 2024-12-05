package com.connectingfrontandback.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // recipe id

    private String name; // name of recipe

    private String ingredients; // ingredients in a recipe

    private String comments;// all comments for a recupe

    private int rating; // Average rating rounded to the nearest integer
    private int totalRating; // Sum of all ratings
    private int ratingCount; // Number of ratings

    // Getters and setters
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getTotalRating() {
        return totalRating;
    }

    public void setTotalRating(int totalRating) {
        this.totalRating = totalRating;
    }

    public int getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(int ratingCount) {
        this.ratingCount = ratingCount;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    //Calculates total Rating
    public void calculateOverallRating() {
        if (ratingCount > 0) {
            this.rating = totalRating / ratingCount; // Calculate average rating
        } else {
            this.rating = 0; // Default to 0 if there are no ratings
        }
    }
}
