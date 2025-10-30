package com.Weplant.entities;

import com.Weplant.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long paymentId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    User user;
    String description;
    Long price;

    LocalDateTime createAt;
    LocalDateTime payDated;

    @Enumerated(EnumType.STRING)
    PaymentStatus paymentStatus;
}
