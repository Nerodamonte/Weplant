package com.Weplant.controllers;

import com.Weplant.dtos.requests.UserUpdateRequest;
import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.dtos.responses.UserDetailResponse;
import com.Weplant.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/getAll")
    public ApiResponse<List<UserDetailResponse>> getAll(){
        List<UserDetailResponse> response = userService.GetAll();
        return ApiResponse.<List<UserDetailResponse>>builder()
                .data(response)
                .build();
    }

    @PutMapping("/adminUpdate/{id}")
    public ApiResponse<Void> adminUpdate(@RequestBody UserUpdateRequest request, @PathVariable Long id) {
        userService.adminUpdate(id, request);
        return ApiResponse.<Void>builder()
                .message("Người dùng đã cập nhật thành công")
                .build();
    }

    @PutMapping("/userUpdate/{id}")
    public ApiResponse<Void> userUpdate(@RequestBody UserUpdateRequest request, @PathVariable Long id) {
        userService.adminUpdate(id, request);
        return ApiResponse.<Void>builder()
                .message("Người dùng đã cập nhật thành công")
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Người dùng đã xoá thành công")
                .build();
    }

    @GetMapping("/user/{id}")
    public ApiResponse<UserDetailResponse> getUserById(@PathVariable Long id){
        UserDetailResponse user = userService.loadUserById(id);
        return ApiResponse.<UserDetailResponse>builder()
                .data(user)
                .build();
        }

}
