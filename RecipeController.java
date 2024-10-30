package main.java.com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/searchByName")
    public List<Recipe> searchRecipesByName(@RequestParam String name) {
        return recipeService.searchByName(name);
    }

    @GetMapping("/searchByIngredient")
    public List<Recipe> searchRecipesByIngredient(@RequestParam String ingredient) {
        return recipeService.searchByIngredient(ingredient);
    }
}
