package com.Weplant.services;

import com.Weplant.entities.Template;
import com.Weplant.entities.TemplateOwner;
import com.Weplant.entities.User;
import com.Weplant.repositories.TemplateOwnerRepository;
import com.Weplant.repositories.TemplateRepository;
import com.Weplant.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TemplateOwnerService {
    @Autowired
    TemplateOwnerRepository templateOwnerRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TemplateRepository templateRepository;

    public void AddTemplateToOwner(Long ownerId, Long templateId) {
        TemplateOwner templateOwner = new TemplateOwner();
        Template template = templateRepository.findById(templateId)
                .orElseThrow(() -> new RuntimeException("Template not found"));
        User user = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        templateOwner.setUser(user);
        templateOwner.setTemplate(template);
        templateOwner.setCreatedAt(LocalDateTime.now());
        templateOwnerRepository.save(templateOwner);
    }

}
