package com.demo.learn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.learn.dto.Login;
import com.demo.learn.dto.Signup;
import com.demo.learn.service.AuthService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping()
public class AuthController {
    @Autowired
    private AuthService service;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Signup data){
        return service.newuser(data);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login data){
        return service.login(data);
    }
    @GetMapping("/customername/{id}")
    public ResponseEntity<?> getname(@PathVariable Long id){
        return service.getname(id);
    }
}
