package com.Weplant.dtos.requests;

import com.Weplant.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RegisterRequest {
    String fullName;
    String email;
    String password;
    Long phoneNumber;
}
