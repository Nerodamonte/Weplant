package com.Weplant.dtos.responses.Dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FeedbackResponse {
    Long feedbackId;
    String projectName;
    String userName;
    String content;
    Integer rating;
    LocalDateTime createdAt;
}
