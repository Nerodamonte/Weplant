package com.Weplant.controllers;

import com.Weplant.dtos.requests.ProjectCreateRequest;
import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.dtos.responses.ProjectDetailResponse;
import com.Weplant.enums.EmailType;
import com.Weplant.enums.ProjectStatus;
import com.Weplant.services.*;
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
    @Autowired
    EmailService emailService;
    @Autowired
    PaymentService paymentService;
    @Autowired
    TemplateOwnerService templateOwnerService;

    @PostMapping("/create")
    public ApiResponse<Void> createProject(@RequestBody ProjectCreateRequest request) throws Exception {
        projectService.create(request);
        paymentService.createPayment(request.getUserId(), request.getPackageId(), request.getProjectName(), request.getTemplateId());
        if(request.getTemplateId() != null){
            templateOwnerService.AddTemplateToOwner(request.getUserId(), request.getTemplateId());
        }
        return ApiResponse.<Void>builder()
                .message("Project created successfully")
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
        if(status == ProjectStatus.COMPLETED_CODING){
            emailService.sendEmailFigmaAndCoding(id, EmailType.CODE_DONE);
        }
        return ApiResponse.<Void>builder()
                .message("Project status updated successfully")
                .build();
    }

    @GetMapping("/getProjectByUserId/{userId}")
    public ApiResponse<List<ProjectDetailResponse>> getProjectsByUserId(@PathVariable Long userId) {
        List<ProjectDetailResponse> response = projectService.getProjectsByUserId(userId);
        return ApiResponse.<List<ProjectDetailResponse>>builder()
                .data(response)
                .build();
    }

    @GetMapping("/getProjectById/{projectId}")
    public ApiResponse<ProjectDetailResponse> getProjectById(@PathVariable Long projectId) {
        ProjectDetailResponse response = projectService.getProjectById(projectId);
        return ApiResponse.<ProjectDetailResponse>builder()
                .data(response)
                .build();
    }

    @PutMapping("/figmaLink/{id}" )
    public ApiResponse<Void> updateFigmaLink(@PathVariable Long id, @RequestBody String figmaLink) {
        projectService.updateFigmaLink(id, figmaLink);
        projectService.updateStatus(id, ProjectStatus.COMPLETE_DESIGNING);
        emailService.sendEmailFigmaAndCoding(id, EmailType.FIGMA_DONE);
        return ApiResponse.<Void>builder()
                .message("Figma link updated successfully")
                .build();
    }

    @PutMapping("/feedback/{id}" )
    public ApiResponse<Void> updateFeedback(@PathVariable Long id, @RequestBody String feedback) {
        projectService.feedBackFigma(id, feedback);
        projectService.updateStatus(id, ProjectStatus.RE_DESIGNING);
        return ApiResponse.<Void>builder()
                .message("Feedback updated successfully")
                .build();
    }
}
