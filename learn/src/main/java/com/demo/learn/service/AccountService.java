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
        a.setAccountnumber(num);
        if(repo.findByCustomer_Id(id)==null){
            a.setRole("default");
        }
        repo.save(a);
        return ResponseEntity.ok(Map.of("Account created successfully",num));
    }
    public ResponseEntity<?> getaccountinfo(Long id) {
        List<Account> data = repo.findByCustomer_Id(id);
        if(data.isEmpty())return ResponseEntity.status(404).body(new ErrorResponse("no Accounts present , Create account"));
        return ResponseEntity.ok(data);
    }
    public ResponseEntity<?> setdefault(Long id, Long accno) {
        Long accid = repo.findDefaultAccountId(id,"default").orElse(null);
        if(accid==null){
            Account data = repo.findByAccountnumber(accno);
            data.setRole("default");
            repo.save(data);
            return ResponseEntity.ok(Map.of("message","updated default account"));
        }
        else{
            Account oldDefault = repo.findById(accid).orElse(null);
            oldDefault.setRole(null);
            System.out.println(accno);
            Account newDefault = repo.findByAccountnumber(accno);
            System.out.println(newDefault);
            newDefault.setRole("default");
            repo.save(oldDefault);
            repo.save(newDefault);
            return ResponseEntity.ok(Map.of("message","updated default ccount"));
        }
    }
    public ResponseEntity<?> getbalance(Long id) {
        Long num = repo.findDefaultAccountId(id,"default").orElse(null);
        System.out.print("blance :"+num);
        if(num==null){
            return ResponseEntity.status(300).body(new ErrorResponse("no value found"));
        }
        Account balance = repo.findById(num).orElse(null);
        return ResponseEntity.ok().body(Map.of("balance",balance.getBalance()));
    }

}
