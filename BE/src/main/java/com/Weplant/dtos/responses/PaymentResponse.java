package com.Weplant.dtos.responses;

import com.Weplant.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PaymentResponse {
    Long paymentId;
    String description;
    Long price;
    LocalDateTime payDated;
    PaymentStatus paymentStatus;
}
