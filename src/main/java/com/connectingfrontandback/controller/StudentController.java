package com.connectingfrontandback.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.connectingfrontandback.model.User;
import com.connectingfrontandback.service.StudentService;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    public StudentService studentService;

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

    @GetMapping("/testDatabase")
    public String testDatabase() {
        try {
            long count = studentService.getAllStudents().size(); // Example database query
            return "Database connected! Total students: " + count;
        } catch (Exception e) {
            return "Database connection failed: " + e.getMessage();
        }
    }

}
