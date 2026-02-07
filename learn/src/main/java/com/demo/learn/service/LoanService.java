package com.demo.learn.service;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.demo.learn.dto.AccountDto;
import com.demo.learn.dto.ErrorResponse;
import com.demo.learn.dto.LoanResponseDTO;
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

    @Autowired
    private AccountService accservice;

    public ResponseEntity<?> newloan(Loandto data, Long id) {
        if (id == null) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("customer id is required"));
        }

        Customer cus = customerrepo.findById(id).orElse(null);
        if (cus == null) {
            return ResponseEntity.status(400)
                .body(new ErrorResponse("create an account first"));
        }

        Loan loan = new Loan();
        loan.setAmount(data.getAmount());
        loan.setIntrestrate(data.getInterestRate());
        loan.setPrincipal_amount(data.getPrincipalAmount());
        loan.setType(data.getType());
        loan.setTenure(data.getTenure());
        loan.setStatus("pending");
        loan.setCustomer(cus);

        repo.save(loan);
        return ResponseEntity.ok(Map.of("message", "Loan applied successfully"));
    }

    public ResponseEntity<?> getloan(Long id) {
        if (id == null) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("customer id is required"));
        }

        if (customerrepo.findById(id).isEmpty()) {
            return ResponseEntity.status(400)
                .body(new ErrorResponse("no customer with this id"));
        }

        List<Loan> data = repo.findByCustomer_Id(id);
        return ResponseEntity.ok(data);
    }
    public ResponseEntity<?> getloans() {
        List<Loan> loans = repo.findAll();
        List<LoanResponseDTO> response = loans.stream()
        .map(loan -> {
            LoanResponseDTO dto = new LoanResponseDTO();
            dto.setId(loan.getId());
            dto.setCid(loan.getCustomer().getId());
            dto.setAmount(loan.getAmount());
            dto.setPrincipalAmount(loan.getPrincipal_amount());
            dto.setInterestRate(loan.getIntrestrate());
            dto.setTenure(loan.getTenure());
            dto.setStatus(loan.getStatus());
            dto.setType(loan.getType());
            return dto;
        })
        .toList();   // Java 16+
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> manageloan(Long id, String status, Long cid) {
        if (id == null || cid == null || status == null) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("id, cid and status are required"));
        }

        Loan data = repo.findById(id).orElse(null);
        if (data == null) {
            return ResponseEntity.status(400)
                .body(new ErrorResponse("no application found with id " + id));
        }

        if ("approved".equalsIgnoreCase(status)) {
            AccountDto acc = new AccountDto();
            acc.setBalance(Double.valueOf(data.getAmount()));
            acc.setType("loan");
            accservice.createaccount(acc, cid);
        }

        data.setStatus(status.toLowerCase());
        repo.save(data);

        return ResponseEntity.ok(Map.of("Message", "updated application status"));
    }
}