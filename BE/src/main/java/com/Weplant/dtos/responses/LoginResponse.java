package com.Weplant.dtos.responses;

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
public class LoginResponse {
    String token;
    Long userId;
    String fullName;
    String email;
    Long phoneNumber;
    Role role;
    LocalDateTime createAt;
}
