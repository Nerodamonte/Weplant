package com.Weplant.controllers;

import com.Weplant.dtos.requests.FeedbackRequest;
import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.dtos.responses.Dashboard.FeedbackResponse;
import com.Weplant.enums.ProjectStatus;
import com.Weplant.services.FeedbackService;
import com.Weplant.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;
    @Autowired
    ProjectService projectService;

    @PostMapping("/create")
    public ApiResponse<Void> createFeedback(@RequestBody FeedbackRequest feedbackRequest) {
        feedbackService.createFeedback(feedbackRequest);
        projectService.updateStatus(feedbackRequest.getProjectId(), ProjectStatus.COMPLETED);
        return ApiResponse.<Void>builder()
                .message("Feedback created successfully")
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<Void> updateFeedback(@PathVariable Long id, @RequestBody FeedbackRequest feedbackRequest) {
        feedbackService.updateFeedback(id, feedbackRequest);
        return ApiResponse.<Void>builder()
                .message("Feedback updated successfully")
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ApiResponse.<Void>builder()
                .message("Feedback deleted successfully")
                .build();
    }

    @GetMapping("/getByProject/{projectId}")
    public ApiResponse<List<FeedbackResponse>> getByProjectId(@PathVariable Long projectId) {
        var response = feedbackService.getByProjectId(projectId);
        return ApiResponse.<List<FeedbackResponse>>builder()
                .data(response)
                .build();
    }

    @GetMapping("/getAll")
    public ApiResponse<List<FeedbackResponse>> getAll() {
        var response = feedbackService.getAllFeedbacks();
        return ApiResponse.<List<FeedbackResponse>>builder()
                .data(response)
                .build();
    }

    @GetMapping("/getById/{id}")
    public ApiResponse<FeedbackResponse> getById(@PathVariable Long id) {
        var response = feedbackService.getFeedbackById(id);
        return ApiResponse.<FeedbackResponse>builder()
                .data(response)
                .build();
    }
}
