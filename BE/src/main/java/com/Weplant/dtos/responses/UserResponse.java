package com.Weplant.dtos.responses;

import com.Weplant.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserResponse {
    Long userId;
    String fullName;
    String email;
    String password;
    Long phoneNumber;
    Role role;
}
