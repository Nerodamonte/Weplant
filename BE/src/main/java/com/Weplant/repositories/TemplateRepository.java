package com.Weplant.repositories;

import com.Weplant.entities.Template;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.jpa.repository.JpaRepository;

@ReadingConverter
public interface TemplateRepository extends JpaRepository<Template,Long> {
}
