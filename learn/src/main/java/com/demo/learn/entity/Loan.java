package com.demo.learn.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Long amount;

    @Column(nullable = false)
    private int tenure;

    @Column(nullable = false)
    private Double principal_amount;

    @Column(nullable = false)
    private Double intrestrate;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name="customer_id",nullable=false)
    private Customer customer;

}
