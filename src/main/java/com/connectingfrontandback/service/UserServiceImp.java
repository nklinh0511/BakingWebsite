package com.connectingfrontandback.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectingfrontandback.model.User;
import com.connectingfrontandback.repository.UserRepository;

@Service 
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository studentRepository; 

    @Override
    public User saveStudent(User student) {
        //saves user information
        return studentRepository.save(student);  
    }

    @Override
    public List<User> getAllStudents() {
        return studentRepository.findAll();  
    }
}
