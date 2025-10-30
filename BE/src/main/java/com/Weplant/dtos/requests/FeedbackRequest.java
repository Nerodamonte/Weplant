package com.Weplant.dtos.requests;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FeedbackRequest {
    Long projectId;
    Long userId;
    String content;
    Integer rating;
    LocalDateTime createdAt;
}
