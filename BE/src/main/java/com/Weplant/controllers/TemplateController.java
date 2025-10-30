package com.Weplant.controllers;

import com.Weplant.dtos.requests.TemplateCreateRequest;
import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.dtos.responses.TemplateDetailResponse;
import com.Weplant.services.ImageService;
import com.Weplant.services.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
public class TemplateController {
    @Autowired
    TemplateService templateService;
    @Autowired
    ImageService imageService;

    @GetMapping("/getAll")
    public ApiResponse<List<TemplateDetailResponse>> getAll(){
        List<TemplateDetailResponse> response = templateService.getAll();
        return ApiResponse.<List<TemplateDetailResponse>>builder()
                .data(response)
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<Long> create(@RequestBody TemplateCreateRequest request) {
        Long id = templateService.create(request);
        return ApiResponse.<Long>builder()
                .message("Template đã tạo thành công")
                .data(id)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<Void> update(@RequestBody TemplateCreateRequest request, @PathVariable Long id) {
        templateService.update(id, request);
        return ApiResponse.<Void>builder()
                .message("Template đã cập nhật thành công")
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) throws Exception {
        imageService.deleteImageByTemplate(id);
        templateService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Template đã xoá thành công")
                .build();
    }

    @GetMapping("/getById/{id}")
    public ApiResponse<TemplateDetailResponse> getById(@PathVariable Long id) {
        TemplateDetailResponse response = templateService.getById(id);
        return ApiResponse.<TemplateDetailResponse>builder()
                .data(response)
                .build();
    }
}
