package com.demo.learn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.learn.entity.Loan;

@Repository
public interface LoanRepo extends JpaRepository<Loan,Long>{
    List<Loan> findByCustomer_Id(Long id);
}
