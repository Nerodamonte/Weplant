package com.Weplant.dtos.requests;

import com.Weplant.enums.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProjectCreateRequest {
    Long userId;
    Long templateId;
    Long packageId;
    String projectName;
    String description;
    ProjectStatus status;
}
