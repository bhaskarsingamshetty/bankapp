package com.demo.learn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.learn.entity.InsuranceProduct;

@Repository
public interface InsuranceProductRepo extends JpaRepository<InsuranceProduct,Long>{

}
