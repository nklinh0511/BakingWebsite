package main.java.com.example.demo;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> searchByName(String name) {
        return recipeRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Recipe> searchByIngredient(String ingredient) {
        return recipeRepository.findByIngredientsContainingIgnoreCase(ingredient);
    }
}
