package com.demo.learn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.learn.entity.TransactionHistory;

public interface TransactionHistoryRepo extends JpaRepository<TransactionHistory, Long> {
    List<TransactionHistory> findByCustomer_Id(Long id);
}
