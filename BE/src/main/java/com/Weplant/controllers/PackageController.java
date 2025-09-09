package com.Weplant.controllers;

import com.Weplant.dtos.requests.PackageCreateRequest;
import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.dtos.responses.PackageDetailResponse;
import com.Weplant.services.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class PackageController {
    @Autowired
    PackageService packageService;

    @GetMapping("/getAll")
    public ApiResponse<List<PackageDetailResponse>> getAll() {
        List<PackageDetailResponse> response = packageService.getAll();
        return ApiResponse.<List<PackageDetailResponse>>builder()
                .data(response)
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<Void> create(@RequestBody PackageCreateRequest request) {
        packageService.createPackage(request);
        return ApiResponse.<Void>builder()
                .message("gói đã xoá thành công")
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<Void> update(@RequestBody PackageCreateRequest request, @PathVariable Long id) {
        packageService.update(id, request);
        return ApiResponse.<Void>builder()
                .message("gói đã cập nhật thành công")
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        packageService.delete(id);
        return ApiResponse.<Void>builder()
                .message("gói đã xoá thành công")
                .build();
    }
}
