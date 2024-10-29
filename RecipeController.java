package main.java.com.example.demo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/searchByName")
    public List<Recipe> searchRecipesByName(@RequestParam String name) {
        return recipeService.searchByName(name);
    }

    @GetMapping("/searchByIngredient")
    public List<Recipe> searchRecipesByIngredient(@RequestParam String ingredient) {
        return recipeService.searchByIngredient(ingredient);
    }
}