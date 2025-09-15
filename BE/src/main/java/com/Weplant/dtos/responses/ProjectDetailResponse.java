package com.Weplant.dtos.responses;

import com.Weplant.entities.PackageEntity;
import com.Weplant.entities.Template;
import com.Weplant.entities.User;
import com.Weplant.enums.ProjectStatus;
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
public class ProjectDetailResponse {
    Long projectId;
    String userName;
    String templateName;
    String packageName;
    String projectName;
    String description;
    ProjectStatus status;
    LocalDateTime createAt;
    List<AttachmentUrlResponse> attachmentUrls;
}
