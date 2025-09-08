package com.Weplant.controllers;

import com.Weplant.dtos.requests.LoginRequest;
import com.Weplant.dtos.requests.RegisterRequest;
import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.dtos.responses.LoginResponse;
import com.Weplant.entities.User;
import com.Weplant.enums.Role;
import com.Weplant.repositories.UserRepository;
import com.Weplant.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ApiResponse.<LoginResponse>builder()
                .data(response)
                .build();
    }

    @PostMapping("/register")
    public ApiResponse<LoginResponse> register(@RequestBody RegisterRequest request) {
        LoginResponse response = authService.register(request);
        return ApiResponse.<LoginResponse>builder()
                .data(response)
                .build();
    }
}
