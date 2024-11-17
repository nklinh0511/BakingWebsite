import java.util.List;

public class RecipeService {
    private RecipeRepository recipeRepository;

    public RecipeService() {
        this.recipeRepository = new RecipeRepository();
    }

    public List<Recipe> searchByName(String name) {
        return recipeRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Recipe> searchByIngredient(String ingredient) {
        return recipeRepository.findByIngredientsContainingIgnoreCase(ingredient);
    }

    public void addRecipe(Recipe recipe) {
        recipeRepository.save(recipe);
    }
}
