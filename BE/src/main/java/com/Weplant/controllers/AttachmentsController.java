package com.Weplant.controllers;

import com.Weplant.configurations.SupabaseConfig;
import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.entities.Attachment;
import com.Weplant.services.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/attachments")
public class AttachmentsController {
    private final AttachmentService attachmentService;

    @PostMapping(value = "/projects/{projectId}/attachments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Void> uploadMultiple(
            @PathVariable Long projectId,
            @RequestPart("files") List<MultipartFile> files) throws Exception {
        attachmentService.uploadMultipleForProject(projectId, files);
        return ApiResponse.<Void>builder()
                .message("Tải lên nhiều file thành công")
                .build();
    }
}
