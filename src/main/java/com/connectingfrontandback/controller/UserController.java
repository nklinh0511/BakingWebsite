package com.connectingfrontandback.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.connectingfrontandback.model.User;
import com.connectingfrontandback.service.LoginService;
import com.connectingfrontandback.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/student")
public class UserController {

    @Autowired
    public UserService studentService;

    @Autowired
    public LoginService loginService;

    @PostConstruct
    public void init() {
        System.out.println("StudentController initialized!");
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> add(@RequestBody User student) {
        studentService.saveStudent(student);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Student added successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getAll")
    public List<User> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Called from loginService
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User loginRequest) {
        Optional<User> user = loginService.validateLogin(loginRequest.getUsername(), loginRequest.getPassword());

        if (user.isPresent()) {
            return ResponseEntity.ok(Map.of("message", "Login successful!"));
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password."));
        }
    }

}
