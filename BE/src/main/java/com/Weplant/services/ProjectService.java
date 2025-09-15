package com.Weplant.services;

import com.Weplant.dtos.requests.ProjectCreateRequest;
import com.Weplant.dtos.responses.AttachmentUrlResponse;
import com.Weplant.dtos.responses.ImageUrlResponse;
import com.Weplant.dtos.responses.ProjectDetailResponse;
import com.Weplant.entities.Project;
import com.Weplant.enums.ProjectStatus;
import com.Weplant.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectService {
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    AttachmentRepository attachmentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    TemplateRepository templateRepository;

    public Long create(ProjectCreateRequest request){
        var pkg = packageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new RuntimeException("Package not found"));
        var user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        var template = templateRepository.findById(request.getTemplateId())
                .orElseThrow(() -> new RuntimeException("Template not found"));
        Project project = Project.builder()
                .projectName(request.getProjectName())
                .description(request.getDescription())
                .createAt(LocalDateTime.now())
                .packageEntity(pkg)
                .user(user)
                .template(template)
                .status(ProjectStatus.IN_PROGRESS)
                .build();
        return projectRepository.save(project).getProjectId();
    }

    public void delete(Long id){
        projectRepository.deleteById(id);
    }

    public List<ProjectDetailResponse> getAll(){
        List<Project> projects = projectRepository.findAll();
        return projects.stream().map(project -> {
            List<AttachmentUrlResponse> attachmentUrls = attachmentRepository.findByProject_ProjectId(project.getProjectId())
                    .stream()
                    .map(attachment -> AttachmentUrlResponse.builder()
                            .attachmentId(attachment.getAttachmentId())
                            .attachmentURL(attachment.getAttachmentURL())
                            .build())
                    .toList();
            return ProjectDetailResponse.builder()
                    .projectId(project.getProjectId())
                    .userName(project.getUser().getFullName())
                    .templateName(project.getTemplate().getTemplateName())
                    .packageName(project.getPackageEntity().getPackageName())
                    .projectName(project.getProjectName())
                    .description(project.getDescription())
                    .status(project.getStatus())
                    .createAt(project.getCreateAt())
                    .attachmentUrls(attachmentUrls)
                    .build();
        }).toList();
    }

    public void update(Long id, ProjectCreateRequest request){
        var pkg = packageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new RuntimeException("Package not found"));
        var user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        var template = templateRepository.findById(request.getTemplateId())
                .orElseThrow(() -> new RuntimeException("Template not found"));
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setProjectName(request.getProjectName());
        project.setDescription(request.getDescription());
        project.setPackageEntity(pkg);
        project.setUser(user);
        project.setTemplate(template);
        projectRepository.save(project);
    }

    public void updateStatus(Long id, ProjectStatus status){
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setStatus(status);
        projectRepository.save(project);
    }

    public List<ProjectStatus> getAllStatuses(){
        return List.of(ProjectStatus.values());
    }

}
