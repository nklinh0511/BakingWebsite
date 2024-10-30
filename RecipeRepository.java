import java.util.ArrayList;
import java.util.List;

public class RecipeRepository {
    private List<Recipe> recipes = new ArrayList<>();
    private Long currentId = 1L;

    public Recipe save(Recipe recipe) {
        recipe.setId(currentId++);
        recipes.add(recipe);
        return recipe;
    }

    public List<Recipe> findByNameContainingIgnoreCase(String name) {
        List<Recipe> result = new ArrayList<>();
        for (Recipe recipe : recipes) {
            if (recipe.getName().toLowerCase().contains(name.toLowerCase())) {
                result.add(recipe);
            }
        }
        return result;
    }

    public List<Recipe> findByIngredientsContainingIgnoreCase(String ingredient) {
        List<Recipe> result = new ArrayList<>();
        for (Recipe recipe : recipes) {
            if (recipe.getIngredients().toLowerCase().contains(ingredient.toLowerCase())) {
                result.add(recipe);
            }
        }
        return result;
    }
}
