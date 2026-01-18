package com.demo.learn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.learn.dto.RequestPolicy;
import com.demo.learn.service.InsuranceService;

@RestController
@RequestMapping("/insurance")
public class InsuranceController {
    @Autowired
    private InsuranceService service; 

    @PostMapping("/new_policy/{id}")
    public ResponseEntity<?> addInsurrance(@RequestBody RequestPolicy data,@PathVariable Long id){
        return service.addInsurrance(data,id);
    }

    @GetMapping("/get_my_policy/{id}")
    public ResponseEntity<?> getpolicy(@PathVariable Long id){
        return service.getpolicy(id);
    }

}
