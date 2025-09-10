package com.Weplant.dtos.responses;

import com.Weplant.enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserDetailResponse {
    Long userId;
    String fullName;
    String email;
    String password;
    Long phoneNumber;
    @Enumerated(EnumType.STRING)
    Role role;
}
