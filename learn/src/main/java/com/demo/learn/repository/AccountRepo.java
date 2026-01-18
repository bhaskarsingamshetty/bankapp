package com.demo.learn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.learn.entity.Account;

public interface AccountRepo extends JpaRepository<Account,Long>{

    boolean existsByAccountnumber(long number);
    Account findByAccountnumber(long number);
    List<Account> findByCustomer_Id(long id);
}
