package com.Weplant.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TemplateDetailResponse {
    Long templateId;
    String templateName;
    String description;
    LocalDateTime createAt;
    List<ImageUrlResponse> images;
}
