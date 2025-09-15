package com.Weplant.services;

import com.Weplant.repositories.ImageRepository;
import com.Weplant.repositories.TemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TemplateService {
    @Autowired
    TemplateRepository templateRepository;

    @Autowired
    ImageRepository imageRepository;
}
