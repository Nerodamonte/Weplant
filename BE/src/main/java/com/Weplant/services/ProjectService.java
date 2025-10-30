package com.Weplant.services;

import com.Weplant.dtos.requests.ProjectCreateRequest;
import com.Weplant.dtos.responses.AttachmentUrlResponse;
import com.Weplant.dtos.responses.ProjectDetailResponse;
import com.Weplant.entities.Project;
import com.Weplant.entities.Template;
import com.Weplant.enums.ProjectStatus;
import com.Weplant.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final AttachmentRepository attachmentRepository;
    private final UserRepository userRepository;
    private final PackageRepository packageRepository;
    private final TemplateRepository templateRepository;

    public ProjectService(ProjectRepository projectRepository,
                          AttachmentRepository attachmentRepository,
                          UserRepository userRepository,
                          PackageRepository packageRepository,
                          TemplateRepository templateRepository) {
        this.projectRepository = projectRepository;
        this.attachmentRepository = attachmentRepository;
        this.userRepository = userRepository;
        this.packageRepository = packageRepository;
        this.templateRepository = templateRepository;
    }

    public Long create(ProjectCreateRequest request){
        var pkg = packageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new RuntimeException("Package not found"));
        var user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Template template = null;
        if (request.getTemplateId() != null) {
            template = templateRepository.findById(request.getTemplateId())
                    .orElseThrow(() -> new RuntimeException("Template not found"));
        }

        Project project = Project.builder()
                .projectName(request.getProjectName())
                .description(request.getDescription())
                .createAt(LocalDateTime.now())
                .packageEntity(pkg)
                .user(user)
                .template(template)
                .status(request.getStatus() != null ? request.getStatus() : ProjectStatus.CREATED)
                .build();
        return projectRepository.save(project).getProjectId();
    }

    public void delete(Long id){
        projectRepository.deleteById(id);
    }

    public List<ProjectDetailResponse> getAll(){
        List<Project> projects = projectRepository.findAll();
        return projects.stream().map(project -> {
            List<AttachmentUrlResponse> attachmentUrls = attachmentRepository
                    .findByProject_ProjectId(project.getProjectId())
                    .stream()
                    .map(attachment -> AttachmentUrlResponse.builder()
                            .attachmentId(attachment.getAttachmentId())
                            .attachmentURL(attachment.getAttachmentURL())
                            .build())
                    .toList();

            String templateName = project.getTemplate() != null
                    ? project.getTemplate().getTemplateName()
                    : null;

            return ProjectDetailResponse.builder()
                    .projectId(project.getProjectId())
                    .userName(project.getUser().getFullName())
                    .templateName(templateName)
                    .packageName(project.getPackageEntity().getPackageName())
                    .projectName(project.getProjectName())
                    .description(project.getDescription())
                    .status(project.getStatus())
                    .createAt(project.getCreateAt())
                    .attachmentUrls(attachmentUrls)
                    .designFeedback(project.getDesignFeedback())
                    .figmaLink(project.getFigmaLink())
                    .build();
        }).toList();
    }

    public void update(Long id, ProjectCreateRequest request){
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (request.getProjectName() != null) {
            project.setProjectName(request.getProjectName());
        }
        if (request.getDescription() != null) {
            project.setDescription(request.getDescription());
        }
        if (request.getPackageId() != null) {
            var pkg = packageRepository.findById(request.getPackageId())
                    .orElseThrow(() -> new RuntimeException("Package not found"));
            project.setPackageEntity(pkg);
        }
        if (request.getUserId() != null) {
            var user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            project.setUser(user);
        }

        if (request.getTemplateId() != null) {
            // set / thay template mới
            Template template = templateRepository.findById(request.getTemplateId())
                    .orElseThrow(() -> new RuntimeException("Template not found"));
            project.setTemplate(template);
        }

        if (request.getStatus() != null) {
            project.setStatus(request.getStatus());
        }

        projectRepository.save(project);
    }

    public void updateStatus(Long id, ProjectStatus status){
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setStatus(status);
        projectRepository.save(project);
    }

    public ProjectDetailResponse getProjectById(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        List<AttachmentUrlResponse> attachmentUrls = attachmentRepository
                .findByProject_ProjectId(project.getProjectId())
                .stream()
                .map(attachment -> AttachmentUrlResponse.builder()
                        .attachmentId(attachment.getAttachmentId())
                        .attachmentURL(attachment.getAttachmentURL())
                        .build())
                .toList();

        String templateName = project.getTemplate() != null
                ? project.getTemplate().getTemplateName()
                : null;

        return ProjectDetailResponse.builder()
                .projectId(project.getProjectId())
                .userName(project.getUser().getFullName())
                .templateName(templateName)
                .packageName(project.getPackageEntity().getPackageName())
                .projectName(project.getProjectName())
                .description(project.getDescription())
                .status(project.getStatus())
                .createAt(project.getCreateAt())
                .attachmentUrls(attachmentUrls)
                .designFeedback(project.getDesignFeedback())
                .figmaLink(project.getFigmaLink())
                .build();
    }

    public List<ProjectDetailResponse> getProjectsByUserId(Long userId) {
        List<Project> projects = projectRepository.findProjectByUser_UserId(userId);
        return projects.stream().map(project -> {
            List<AttachmentUrlResponse> attachmentUrls = attachmentRepository
                    .findByProject_ProjectId(project.getProjectId())
                    .stream()
                    .map(attachment -> AttachmentUrlResponse.builder()
                            .attachmentId(attachment.getAttachmentId())
                            .attachmentURL(attachment.getAttachmentURL())
                            .build())
                    .toList();

            String templateName = project.getTemplate() != null
                    ? project.getTemplate().getTemplateName()
                    : null;

            return ProjectDetailResponse.builder()
                    .projectId(project.getProjectId())
                    .userName(project.getUser().getFullName())
                    .templateName(templateName)
                    .packageName(project.getPackageEntity().getPackageName())
                    .projectName(project.getProjectName())
                    .description(project.getDescription())
                    .status(project.getStatus())
                    .createAt(project.getCreateAt())
                    .attachmentUrls(attachmentUrls)
                    .designFeedback(project.getDesignFeedback())
                    .figmaLink(project.getFigmaLink())
                    .build();
        }).toList();
    }

    public List<ProjectStatus> getAllStatuses(){
        return List.of(ProjectStatus.values());
    }

    public void updateFigmaLink(Long projectId, String figmaLink) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setFigmaLink(figmaLink);
        projectRepository.save(project);
    }

    public void feedBackFigma(Long projectId, String designFeedback) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setDesignFeedback(designFeedback);
        projectRepository.save(project);
    }
}