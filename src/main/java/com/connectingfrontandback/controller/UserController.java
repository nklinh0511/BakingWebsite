package com.connectingfrontandback.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.connectingfrontandback.model.AddRecipeRequest;
import com.connectingfrontandback.model.FavoriteRecipes;
import com.connectingfrontandback.model.Recipe;
import com.connectingfrontandback.model.User;
import com.connectingfrontandback.repository.ApiResponse;
import com.connectingfrontandback.service.LoginService;
import com.connectingfrontandback.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/student")
public class UserController {

    @Autowired
    public UserService studentService;

    @Autowired
    public LoginService loginService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> add(@RequestBody User student) {
        // called from UserService
        studentService.saveStudent(student);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Student added successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getAll")
    public List<User> getAllStudents() {

        // called from UserService
        return studentService.getAllStudents();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User loginRequest, HttpSession session) {

        // Validate login credentials
        Optional<User> user = loginService.validateLogin(loginRequest.getUsername(), loginRequest.getPassword());

        if (user.isPresent()) {
            // Store the username in the session upon successful login
            session.setAttribute("username", loginRequest.getUsername());

            // Log the session creation for debugging purposes (if needed)
            System.out.println("Login successful for user: " + loginRequest.getUsername());
            System.out.println("Session created with ID: " + session.getId());

            // Respond with a success message
            return ResponseEntity.ok(Map.of("message", "Login successful!"));
        } else {
            // Log the failed login attempt for debugging purposes (optional)
            System.out.println("Failed login attempt for username: " + loginRequest.getUsername());

            // Respond with a 401 Unauthorized status
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid username or password."));
        }
    }

    @GetMapping("/checkSession")
    public ResponseEntity<Map<String, String>> checkSession(HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username != null) {
            return ResponseEntity.ok(Map.of("message", "Session active", "username", username));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "No active session"));
    }

    @GetMapping("/getfavoriterecipes")
    public ResponseEntity<?> getFavoriteRecipes(HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "User not logged in"));
        }

        List<String> favoriteRecipes = studentService.getFavoriteRecipes(username);
        if (!favoriteRecipes.isEmpty()) {
            return ResponseEntity.ok(new FavoriteRecipes(true, favoriteRecipes));
        }
        return ResponseEntity.ok(new ApiResponse(false, "No favorite recipes found"));
    }

    @PostMapping("/addfavoriterecipe")
    public ResponseEntity<?> addFavoriteRecipe(@RequestBody AddRecipeRequest addRecipeRequest, HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "User not logged in"));
        }

        if (studentService.addFavoriteRecipe(username, addRecipeRequest.getRecipeName())) {
            return ResponseEntity.ok(new ApiResponse(true, "Recipe added successfully"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse(false, "Failed to add recipe"));
    }

}
