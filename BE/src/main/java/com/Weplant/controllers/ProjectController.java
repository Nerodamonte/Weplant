package com.Weplant.controllers;

import com.Weplant.dtos.requests.ProjectCreateRequest;
import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.dtos.responses.ProjectDetailResponse;
import com.Weplant.enums.ProjectStatus;
import com.Weplant.services.AttachmentService;
import com.Weplant.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    ProjectService projectService;
    @Autowired
    AttachmentService attachmentService;

    @PostMapping("/create")
    public ApiResponse<Long> createProject(@RequestBody ProjectCreateRequest request) throws Exception {
        Long projectId = projectService.create(request);
        return ApiResponse.<Long>builder()
                .message("Project created successfully")
                .data(projectId)
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> deleteProject(@PathVariable Long id) throws Exception {
        attachmentService.deleteAttachmentByProject(id);
        projectService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Project deleted successfully")
                .build();
    }

    @GetMapping("/getAll")
    public ApiResponse<List<ProjectDetailResponse>> getAll(){
        List<ProjectDetailResponse> response = projectService.getAll();
        return ApiResponse.<List<ProjectDetailResponse>>builder()
                .data(response)
                .build();
    }

    @PutMapping("/update/{id}")
    public  ApiResponse<Void> updateProject(@PathVariable Long id, @RequestBody ProjectCreateRequest request) throws Exception {
        projectService.update(id, request);
        return ApiResponse.<Void>builder()
                .message("Project updated successfully")
                .build();
    }

    @GetMapping("/getAllStatus")
    public ApiResponse<List<ProjectStatus>> getAllStatuses(){
        List<ProjectStatus> statuses = List.of(ProjectStatus.values());
        return ApiResponse.<List<ProjectStatus>>builder()
                .data(statuses)
                .build();
    }

    @PutMapping("/updateStatus/{id}")
    public ApiResponse<Void> updateStatus(@PathVariable Long id, @RequestParam ProjectStatus status) throws Exception {
        projectService.updateStatus(id, status);
        return ApiResponse.<Void>builder()
                .message("Project status updated successfully")
                .build();
    }
}
