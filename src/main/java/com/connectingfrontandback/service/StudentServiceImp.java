package com.connectingfrontandback.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectingfrontandback.model.User;
import com.connectingfrontandback.repository.StudentRepository;

@Service 
public class StudentServiceImp implements StudentService {

    @Autowired
    private StudentRepository studentRepository; 

    @Override
    public User saveStudent(User student) {
        System.out.println("Saving student: " + student);
        return studentRepository.save(student);  
    }

    @Override
    public List<User> getAllStudents() {
        return studentRepository.findAll();  
    }
}
