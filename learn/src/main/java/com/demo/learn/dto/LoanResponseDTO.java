package com.demo.learn.dto;
import lombok.Data;
@Data
public class LoanResponseDTO {
    private Long id;
    private double amount;
    private double principalAmount;
    private double interestRate;
    private int tenure;
    private String status;
    private String type;
}
