package com.demo.learn.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.demo.learn.entity.Account;

public interface AccountRepo extends JpaRepository<Account,Long>{

    boolean existsByAccountnumber(long number);
    Account findByAccountnumber(long number);
    List<Account> findByCustomer_Id(long id); 
    @Query("""
        select a.id
        from Account a
        where a.customer.id = :customerId
          and a.role = :role
    """)
    Optional<Long> findDefaultAccountId(
            @Param("customerId") Long customerId,
            @Param("role") String role
    );
}
