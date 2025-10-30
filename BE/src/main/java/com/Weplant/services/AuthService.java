package com.Weplant.services;

import com.Weplant.configurations.JwtUtil;
import com.Weplant.dtos.requests.LoginRequest;
import com.Weplant.dtos.requests.ForgotPasswordRequest;
import com.Weplant.dtos.requests.RegisterRequest;
import com.Weplant.dtos.responses.LoginResponse;
import com.Weplant.entities.PasswordResetToken;
import com.Weplant.entities.User;
import com.Weplant.enums.AccountStatus;
import com.Weplant.enums.Role;
import com.Weplant.repositories.PasswordResetTokenRepository;
import com.Weplant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository tokenRepository;

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        User user = (User) authentication.getPrincipal();

        if(user.getStatus() != AccountStatus.ACTIVE) {
            throw new RuntimeException("Account is not active");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return LoginResponse.builder()
                .token(token)
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .createAt(user.getCreateAt())
                .build();
    }

    public void register(RegisterRequest request) {
        String email = request.getEmail();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email existed");
        }

        User user = new User();
        user.setEmail(email);
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(Role.CUSTOMER);
        user.setStatus(AccountStatus.INACTIVE);
        user.setCreateAt(LocalDateTime.now());

        userRepository.save(user);
    }

    public void activateAccount(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getStatus() == AccountStatus.ACTIVE) {
            throw new RuntimeException("Account is already active");
        }

        user.setStatus(AccountStatus.ACTIVE);
        userRepository.save(user);
    }

    public String forgotPassword(ForgotPasswordRequest request){
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("Không tìm thấy email"));
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        tokenRepository.save(resetToken);
        return token;
    }

    public void resetPassword(String token, String newPassword){
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token không hợp lệ"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token đã hết hạn");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
    }

    private boolean isValidEmailDomain(String email) {
        String lowerCaseEmail = email.toLowerCase();
        return lowerCaseEmail.endsWith("@gmail.com") ||
                lowerCaseEmail.endsWith("@yahoo.com") ||
                lowerCaseEmail.endsWith("@outlook.com");
    }
}