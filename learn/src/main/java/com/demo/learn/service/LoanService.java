package com.demo.learn.service;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.demo.learn.dto.ErrorResponse;
import com.demo.learn.dto.Loandto;
import com.demo.learn.entity.Customer;
import com.demo.learn.entity.Loan;
import com.demo.learn.repository.CustomerRepo;
import com.demo.learn.repository.LoanRepo;

@Service
public class LoanService {

    @Autowired
    private LoanRepo repo;
    @Autowired
    private CustomerRepo customerrepo;
    public ResponseEntity<?> newloan(Loandto data , Long id) {
        Loan loan = new Loan();
        loan.setAmount(data.getAmount());
        loan.setIntrestrate(data.getInterestRate());
        loan.setPrincipal_amount(data.getPrincipalAmount());
        loan.setType(data.getType());
        loan.setTenure(data.getTenure());
        loan.setStatus("pending");
        Customer cus = customerrepo.findById(id).orElse(null);
        if (cus == null) {
            return ResponseEntity.status(400).body(new ErrorResponse("create an account first"));
        }
        loan.setCustomer(cus);
        repo.save(loan);
        return ResponseEntity.ok(Map.of("message","Loan applied succesfully"));
    }
    public ResponseEntity<?> getloan(long id) {
        if(customerrepo.findById(id).isEmpty())return ResponseEntity.status(400).body(new ErrorResponse("no customer with this id"));
        List<Loan> data = repo.findByCustomer_Id (id);
        return ResponseEntity.ok(data);


    }
    public ResponseEntity<?> getallloans() {
        return ResponseEntity.ok(repo.findAll());
    }

}
