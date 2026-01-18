package com.demo.learn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.learn.entity.InsurancePolicy;

public interface InsurancePolicyRepo extends JpaRepository<InsurancePolicy,Long>{
    boolean existsByCustomer_Id(Long id);
    List<InsurancePolicy> findByCustomer_Id(Long id);
}
