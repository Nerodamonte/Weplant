package com.Weplant.services;

import com.Weplant.dtos.requests.FeedbackRequest;
import com.Weplant.dtos.responses.Dashboard.FeedbackResponse;
import com.Weplant.entities.Feedback;
import com.Weplant.entities.Project;
import com.Weplant.entities.User;
import com.Weplant.repositories.FeedbackRepository;
import com.Weplant.repositories.ProjectRepository;
import com.Weplant.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    FeedbackRepository feedbackRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProjectRepository projectRepository;

    public void createFeedback(FeedbackRequest request){
        Project project = projectRepository.findById(request.getProjectId()).orElseThrow(() -> new RuntimeException("Project not found"));
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));

        Feedback feedback = Feedback.builder()
                .project(project)
                .user(user)
                .content(request.getContent())
                .rating(request.getRating())
                .createdAt(LocalDateTime.now())
                .build();
        feedbackRepository.save(feedback);
    }

    public void updateFeedback(Long id, FeedbackRequest request){
        Feedback feedback = feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedback.setContent(request.getContent());
        feedback.setRating(request.getRating());
        feedbackRepository.save(feedback);
    }

    public void deleteFeedback(Long id){
        feedbackRepository.deleteById(id);
    }

    public List<FeedbackResponse> getByProjectId(Long projectId){
        List<Feedback> feedbacks = feedbackRepository.findByProject_ProjectId(projectId);
        return feedbacks.stream().map(feedback -> FeedbackResponse.builder()
                .feedbackId(feedback.getFeedbackId())
                .userName(feedback.getUser().getFullName())
                .projectName(feedback.getProject().getProjectName())
                .content(feedback.getContent())
                .rating(feedback.getRating())
                .createdAt(feedback.getCreatedAt())
                .build()).toList();
    }

    public List<FeedbackResponse> getAllFeedbacks(){
        List<Feedback> feedbacks = feedbackRepository.findAll();
        return feedbacks.stream().map(feedback -> FeedbackResponse.builder()
                .feedbackId(feedback.getFeedbackId())
                .userName(feedback.getUser().getFullName())
                .projectName(feedback.getProject().getProjectName())
                .content(feedback.getContent())
                .rating(feedback.getRating())
                .createdAt(feedback.getCreatedAt())
                .build()).toList();
    }

    public FeedbackResponse getFeedbackById(Long id){
        Feedback feedback = feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
        return FeedbackResponse.builder()
                .feedbackId(feedback.getFeedbackId())
                .userName(feedback.getUser().getFullName())
                .projectName(feedback.getProject().getProjectName())
                .content(feedback.getContent())
                .rating(feedback.getRating())
                .createdAt(feedback.getCreatedAt())
                .build();
    }

}
