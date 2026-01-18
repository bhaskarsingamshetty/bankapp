package com.demo.learn.dto;

import lombok.Data;

@Data
public class Loandto {
    private String type;
    private Long amount;
    private int tenure;
    private Double principalAmount;
    private Double interestRate;
}
