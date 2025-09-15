package com.Weplant.entities;

import com.Weplant.enums.ProjectStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "projects")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long projectId;

    @ManyToOne
    @JoinColumn(name = "userId")
    User user;

    @ManyToOne
    @JoinColumn(name = "templateId")
    Template template;

    @ManyToOne
    @JoinColumn(name = "packageId")
    PackageEntity packageEntity;

    @OneToMany(mappedBy = "project")
    List<Attachment> attachments;

    String projectName;
    String description;

    @Enumerated(EnumType.STRING)
    ProjectStatus status;

    LocalDateTime createAt;
}
