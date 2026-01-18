package com.demo.learn.service;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.demo.learn.dto.ErrorResponse;
import com.demo.learn.dto.Login;
import com.demo.learn.dto.Signup;
import com.demo.learn.entity.Customer;
import com.demo.learn.jwt.JwtUtil;
import com.demo.learn.repository.CustomerRepo;

@Service
public class AuthService {

    @Autowired
    private CustomerRepo repo;
    @Autowired
    private JwtUtil jwtutil;
    private BCryptPasswordEncoder encoder =new BCryptPasswordEncoder(12);
    public ResponseEntity<?> newuser(Signup data) {
        if(repo.existsByEmail(data.getEmail())){
            return ResponseEntity.badRequest().body(new ErrorResponse("email alredy exists"));
        }
        Customer c = new Customer();
        c.setName(data.getName());
        c.setEmail(data.getEmail());
        c.setPhone(data.getPhone());
        c.setPassword(encoder.encode(data.getPassword()));
        repo.save(c);
        return ResponseEntity.ok(true);
    }
    public ResponseEntity<?> login(Login data) {
        if(!repo.existsByEmail(data.getEmail())){
            return ResponseEntity.badRequest().body(new ErrorResponse("mail does not exists , if not signup"));
        }
        Customer item = repo.findByEmail(data.getEmail());
        if(encoder.matches(data.getPassword(),item.getPassword())){
            String token = jwtutil.generateToken(data.getEmail());
            return ResponseEntity.ok(Map.of(
                "message","Login Succesfull",
                "token",token,
                "id",item.getId()
            ));
        }return ResponseEntity.badRequest().body(new ErrorResponse("wrong password"));
    }
    public ResponseEntity<?> getname(Long id) {
        Customer data = repo.findById(id).orElse(null);
        return ResponseEntity.ok(data.getName());
    }

}
