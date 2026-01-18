package com.demo.learn.dto;

import lombok.Data;

@Data
public class TransactionRequest {
    private Long receiveraccountnumber;
    private Long senderaccountnumber;
    private Double amount;
}
