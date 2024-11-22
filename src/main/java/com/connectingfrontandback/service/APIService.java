package com.connectingfrontandback.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Service;

@Service
public class APIService {

    private static final String API_KEY = "34935d6c4ac34ae7a2f610def5615c69";
    private static final String BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

    // Search recipes by name
    public String searchRecipesByName(String name) {
        String endpoint = BASE_URL + "?query=" + name + "&apiKey=" + API_KEY;
        return callApi(endpoint);
    }

    // Search recipes by ingredient
    public String searchRecipesByIngredient(String ingredient) {
        String endpoint = BASE_URL + "?includeIngredients=" + ingredient + "&apiKey=" + API_KEY;
        return callApi(endpoint);
    }

    // Common method to call the API
    private String callApi(String endpoint) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .GET()
                .build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body(); // Return raw API response
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "Error during API request: " + e.getMessage();
        }
    }
}
