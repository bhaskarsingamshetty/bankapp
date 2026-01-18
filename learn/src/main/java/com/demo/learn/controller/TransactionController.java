package com.demo.learn.controller;

import org.springframework.web.bind.annotation.RestController;

import com.demo.learn.dto.TransactionRequest;
import com.demo.learn.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @PostMapping("/do_transaction")
    public ResponseEntity<?> dotransaction(@RequestBody TransactionRequest data){
        return service.dotransaction(data);
    }
    @GetMapping("/get_transaction/{id}")
    public ResponseEntity<?> transactions(@PathVariable long id){
        return service.gettransaction(id);
    }
}
