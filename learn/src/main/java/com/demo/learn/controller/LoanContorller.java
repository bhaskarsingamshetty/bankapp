package com.demo.learn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.learn.dto.Loandto;
import com.demo.learn.service.LoanService;

@RestController
@RequestMapping("/loan")
public class LoanContorller {

    @Autowired
    private LoanService service;
    @PostMapping("/apply_loan/{id}")
    public ResponseEntity<?> newloan(@RequestBody Loandto data,@PathVariable long id){
        return service.newloan(data,id);
    
    }
    @GetMapping("/getloans/{id}")
    public ResponseEntity<?> getloans(@PathVariable long id){
        return service.getloan(id);
    }
    @GetMapping("admin/getloans")
    public ResponseEntity<?> getallloans(){
        return service.getloans();
    }
    @PostMapping("admin/manageloan")
    public ResponseEntity<?> manageloan(@RequestParam Long id,
        @RequestParam String status,
        @RequestParam(required = false) Long cid){
        return service.manageloan(id,status,cid);
    }
    
}
