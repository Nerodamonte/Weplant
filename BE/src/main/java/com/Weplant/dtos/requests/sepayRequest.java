package com.Weplant.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class sepayRequest {
     Long id;
     String gateway;
     String transactionDate;
     String accountNumber;
     String content;
     String transferType;
     Long transferAmount;
     String referenceCode;
     String description;
}
