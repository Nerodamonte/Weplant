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
    private Long templateId;

    private String templateName;
    private String description;
    private LocalDateTime createAt;

    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL)
    private List<Image> images;

    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL)
    private List<Project> projects;
}
