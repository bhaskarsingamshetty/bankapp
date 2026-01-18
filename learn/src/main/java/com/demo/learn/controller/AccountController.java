package com.demo.learn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.learn.dto.AccountDto;
import com.demo.learn.service.AccountService;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    AccountService service;

    @PostMapping("/info/{id}")
    public ResponseEntity<?> createaccount(@RequestBody AccountDto data,@PathVariable Long id){
        return service.createaccount(data,id);
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<?> getaccountinfo(@PathVariable Long id){
        return service.getaccountinfo(id);
    }

    // also add new method to  get type of accounts user have

    @GetMapping("/balance/{id}")
    public ResponseEntity<?> getbalance(@PathVariable Long id){
        return service.getbalance(id);
    }
}
