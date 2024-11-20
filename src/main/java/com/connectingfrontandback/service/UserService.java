package com.connectingfrontandback.service;

import java.util.List;

import com.connectingfrontandback.model.User;

public interface UserService {
    public User saveStudent(User student);
    public List<User> getAllStudents();
}
