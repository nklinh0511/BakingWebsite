package com.connectingfrontandback.service;

import com.connectingfrontandback.model.User;
import com.connectingfrontandback.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> validateLogin(String username, String password) {
        // Find the user by username
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user; // Login successful
        }

        return Optional.empty(); // Login failed
    }
}
