package com.Weplant.controllers;

import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    ImageService imageService;

    @PostMapping(value = "/upload/{templateId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Void> uploadMultiple(
            @PathVariable Long templateId,
            @RequestPart("files") List<MultipartFile> files) throws Exception {
        imageService.uploadMultipleForProject(templateId, files);
        return ApiResponse.<Void>builder()
                .message("Tải lên nhiều file thành công")
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> deleteAttachment(@PathVariable Long id) {
        try {
            imageService.deleteImage(id);
            return ApiResponse.<Void>builder().message("Xóa file thành công").build();
        } catch (Exception e) {
            return ApiResponse.<Void>builder().code(500).message(e.getMessage()).build();
        }
    }
}
