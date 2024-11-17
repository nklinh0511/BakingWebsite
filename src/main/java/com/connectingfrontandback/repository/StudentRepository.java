package com.connectingfrontandback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.connectingfrontandback.model.User;

@Repository
public interface StudentRepository extends JpaRepository <User, String>{

}
