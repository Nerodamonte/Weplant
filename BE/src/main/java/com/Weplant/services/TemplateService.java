package com.Weplant.services;

import com.Weplant.dtos.requests.TemplateCreateRequest;
import com.Weplant.dtos.responses.ImageUrlResponse;
import com.Weplant.dtos.responses.TemplateDetailResponse;
import com.Weplant.entities.Template;
import com.Weplant.repositories.ImageRepository;
import com.Weplant.repositories.TemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TemplateService {
    @Autowired
    TemplateRepository templateRepository;

    @Autowired
    ImageRepository imageRepository;

    public void create(TemplateCreateRequest request) {
        Template template = Template.builder()
                .templateName(request.getTemplateName())
                .description(request.getDescription())
                .createAt(LocalDateTime.now())
                .build();
        templateRepository.save(template);
    }

    public List<TemplateDetailResponse> getAll() {
        List<Template> templates = templateRepository.findAll();
        return templates.stream().map(template -> TemplateDetailResponse.builder()
                .templateId(template.getTemplateId())
                .templateName(template.getTemplateName())
                .description(template.getDescription())
                .createAt(template.getCreateAt())
                .images(getImagesByTemplateId(template.getTemplateId()))
                .build()).toList();
    }

    public void delete(Long id) {
        templateRepository.deleteById(id);
    }

    public void update(Long id, TemplateCreateRequest request) {
        Template template = templateRepository.findById(id).orElseThrow();
        template.setTemplateName(request.getTemplateName());
        template.setDescription(request.getDescription());
        templateRepository.save(template);
    }

    public List<ImageUrlResponse> getImagesByTemplateId(Long templateId) {
        return imageRepository.findByTemplate_TemplateId(templateId).stream()
                .map(image -> ImageUrlResponse.builder()
                        .imageId(image.getImageId())
                        .imageUrl(image.getImageUrl())
                        .build())
                .toList();
    }
}
