package com.Weplant.controllers;

import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.services.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/attachments")
public class AttachmentsController {
    private final AttachmentService attachmentService;

    @PostMapping(value = "/upload/{projectId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Void> uploadMultiple(
            @PathVariable Long projectId,
            @RequestPart("files") List<MultipartFile> files) throws Exception {
        attachmentService.uploadMultipleForProject(projectId, files);
        return ApiResponse.<Void>builder()
                .message("Tải lên nhiều file thành công")
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> deleteAttachment(@PathVariable Long id) {
        try {
            attachmentService.deleteAttachment(id);
            return ApiResponse.<Void>builder().message("Xóa file thành công").build();
        } catch (Exception e) {
            return ApiResponse.<Void>builder().code(500).message(e.getMessage()).build();
        }
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Void> updateAttachment(@PathVariable Long id, @RequestPart("file") MultipartFile file) {
        try {
            attachmentService.updateAttachment(id, file);
            return ApiResponse.<Void>builder().message("Cập nhật file thành công").build();
        } catch (Exception e) {
            return ApiResponse.<Void>builder().code(500).message(e.getMessage()).build();
        }
    }
}
