package com.demo.learn.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.demo.learn.dto.ErrorResponse;
import com.demo.learn.dto.RequestPolicy;
import com.demo.learn.entity.InsurancePolicy;
import com.demo.learn.repository.CustomerRepo;
import com.demo.learn.repository.InsurancePolicyRepo;
import com.demo.learn.repository.InsuranceProductRepo;


@Service
public class InsuranceService {

    @Autowired
    private InsuranceProductRepo productrepo;
    @Autowired
    private CustomerRepo custorepo;
    @Autowired
    private InsurancePolicyRepo repo; 

    public ResponseEntity<?> addInsurrance(RequestPolicy data, Long id) {
        InsurancePolicy policy = new InsurancePolicy();
        policy.setCustomer(custorepo.findById(id).orElse(null));
        policy.setPremiumAmount(data.getPremiumAmount());
        policy.setProduct(productrepo.findById(id).orElse(null));
        policy.setStatus("processing");
        repo.save(policy);
        return ResponseEntity.ok(Map.of("message","apllied for insurrance"));
    }

    public ResponseEntity<?> getpolicy(Long id) {
        if(!repo.existsByCustomer_Id(id))return ResponseEntity.status(404).body(new ErrorResponse("no data of customer"));
        return ResponseEntity.ok(repo.findByCustomer_Id(id));
    }
}
