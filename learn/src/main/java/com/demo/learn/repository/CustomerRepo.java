package com.demo.learn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.learn.entity.Customer;

@Repository
public interface CustomerRepo extends JpaRepository<Customer,Long>{
     boolean existsByEmail(String email);
     Customer findByEmail(String email);
}
