package com.Weplant.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Templates")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Template {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long templateId;

    String templateName;
    String description;
    LocalDateTime createAt;
    Long price;

    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL, orphanRemoval = true)
    List<TemplateOwner> owners;

    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL)
    List<Image> images;

    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL)
    List<Project> projects;
}
