package com.demo.learn.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.demo.learn.dto.AccountDto;
import com.demo.learn.dto.ErrorResponse;
import com.demo.learn.entity.Account;
import com.demo.learn.entity.Customer;
import com.demo.learn.repository.AccountRepo;
import com.demo.learn.repository.CustomerRepo;

@Service
public class AccountService {

    @Autowired
    private AccountRepo repo;
    @Autowired
    private CustomerRepo customerRepo;
    public ResponseEntity<?> createaccount(AccountDto data,Long id) {
        Account a = new Account();
        a.setBalance(data.getBalance());
        a.setType(data.getType());
        Customer customer = customerRepo.findById(id).orElse(null);
        a.setCustomer(customer);
        long num=0;
       while (num == 0 || repo.existsByAccountnumber(num)) {
            num = (long) (Math.random() * 10000000000L); 
        }
        a.setAccountnumber(Long.toString(num));
        repo.save(a);
        return ResponseEntity.ok(Map.of("Account created successfully",num));
    }
    public ResponseEntity<?> getbalance(Long id) {
        Account data = repo.findByAccountnumber(id);
        if(data.getAccountnumber()!=null)
        return ResponseEntity.ok(Map.of("Balance",data.getBalance()));
        
        return ResponseEntity.status(404).body(new ErrorResponse("NO Account present to fetch Balance"));
    }
    public ResponseEntity<?> getaccountinfo(Long id) {
        List<Account> data = repo.findByCustomer_Id(id);
        if(data.isEmpty())return ResponseEntity.status(404).body(new ErrorResponse("no Accounts present , Create account"));
        return ResponseEntity.ok(data);
    }

}
