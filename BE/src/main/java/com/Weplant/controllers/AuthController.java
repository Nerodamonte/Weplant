package com.Weplant.controllers;

import com.Weplant.dtos.requests.LoginRequest;
import com.Weplant.dtos.requests.ForgotPasswordRequest;
import com.Weplant.dtos.requests.RegisterRequest;
import com.Weplant.dtos.requests.ResetPasswordRequest;
import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.dtos.responses.LoginResponse;
import com.Weplant.repositories.UserRepository;
import com.Weplant.services.AuthService;
import com.Weplant.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    EmailService emailService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ApiResponse.<LoginResponse>builder()
                .data(response)
                .build();
    }

    @PostMapping("/register")
    public ApiResponse<LoginResponse> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        emailService.sendActivateAccountMail(request.getEmail());
        return ApiResponse.<LoginResponse>builder()
                .message("Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.")
                .build();
    }

    @PutMapping("/activateAccount")
    public ApiResponse<Void> activateAccount(@RequestParam String email) {
        authService.activateAccount(email);
        return ApiResponse.<Void>builder()
                .message("Tài khoản đã được kích hoạt thành công.")
                .build();
    }

    @PostMapping("/forgotPassword")
    public ApiResponse<Void> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        String token = authService.forgotPassword(request);
        emailService.sendResetPasswordMail(request.getEmail(), token);
        return ApiResponse.<Void>builder()
                .message("yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.")
                .build();
    }

    @PostMapping("/resetPassword")
    public ApiResponse<Void> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request.getToken(), request.getNewPassword());
        return ApiResponse.<Void>builder()
                .message("Mật khẩu đã được đặt lại thành công.")
                .build();
    }
}
