package com.Weplant.services;

import com.Weplant.dtos.requests.UserUpdateRequest;
import com.Weplant.dtos.responses.UserDetailResponse;
import com.Weplant.entities.User;
import com.Weplant.enums.Role;
import com.Weplant.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public List<UserDetailResponse> GetAll(){
        List<User> userList = userRepository.findAll();
        return userList.stream().map(user -> UserDetailResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .build()).toList();
    }

    public void delete(Long id){
        userRepository.deleteById(id);
    }

    public void adminUpdate(Long id, UserUpdateRequest request){
        User user = userRepository.findById(id).orElseThrow();
        if(!user.getEmail().equals(request.getEmail()) && userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email đã tồn tại");
        }
        user.setRole(request.getRole());
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        if(request.getPassword() != null && !request.getPassword().isEmpty()){
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        userRepository.save(user);
    }

    public UserDetailResponse loadUserById(Long id) throws UsernameNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return UserDetailResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .build();
    }

    public void userUpdate(Long id, UserUpdateRequest request){
        User user = userRepository.findById(id).orElseThrow();
        if(!user.getEmail().equals(request.getEmail()) && userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email đã tồn tại");
        }
        user.setEmail(request.getEmail());
        user.setRole(Role.CUSTOMER);
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        if(request.getPassword() != null && !request.getPassword().isEmpty()){
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        userRepository.save(user);
    }
}
