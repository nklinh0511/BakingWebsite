package com.connectingfrontandback.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectingfrontandback.model.Recipe;
import com.connectingfrontandback.model.User;
import com.connectingfrontandback.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository studentRepository;

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

    // public Recipe getRecipeById(int id) {
    // // Fetch the recipe using the repository
    // return recipeRepository.findById(id).orElse(null);
    // }
}

// Mirandas original code for get and add recipes
// public List<String> getFavoriteRecipes(String username) {
// List<String> favoriteRecipes = new ArrayList<>();
// try (Reader reader = Files.newBufferedReader(Paths.get(USER_CSV_FILE));
// CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader()))
// {

// for (CSVRecord record : csvParser) {
// if (record.get("Username").equals(username) &&
// record.isSet("FavoriteRecipes")) {
// String[] recipes = record.get("FavoriteRecipes").split(",");
// favoriteRecipes.addAll(Arrays.asList(recipes));
// }
// }
// } catch (IOException e) {
// e.printStackTrace();
// }
// return favoriteRecipes;
// }

// public boolean addFavoriteRecipe(String username, String recipeName) {
// List<Map<String, String>> users = new ArrayList<>();
// boolean userFound = false;

// try (Reader reader = Files.newBufferedReader(Paths.get(USER_CSV_FILE));
// CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader()))
// {

// for (CSVRecord record : csvParser) {
// Map<String, String> user = record.toMap();
// if (record.get("Username").equals(username)) {
// userFound = true;
// String currentFavorites = record.isSet("FavoriteRecipes") ?
// record.get("FavoriteRecipes") : "";
// user.put("FavoriteRecipes", currentFavorites.isEmpty() ? recipeName :
// currentFavorites + "," + recipeName);
// }
// users.add(user);
// }
// } catch (IOException e) {
// e.printStackTrace();
// }

// if (userFound) {
// try (Writer writer = Files.newBufferedWriter(Paths.get(USER_CSV_FILE));
// CSVPrinter csvPrinter = new CSVPrinter(writer,
// CSVFormat.DEFAULT.withHeader("Username", "Password", "FavoriteRecipes"))) {

// for (Map<String, String> user : users) {
// csvPrinter.printRecord(user.values());
// }
// csvPrinter.flush();
// return true;
// } catch (IOException e) {
// e.printStackTrace();
// }
// }
// return false;
