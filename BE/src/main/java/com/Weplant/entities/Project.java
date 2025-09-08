package com.Weplant.entities;

import com.Weplant.enums.ProjectStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;

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
    @JoinColumn(name = "paymentId")
    Payment payment;

    @ManyToOne
    @JoinColumn(name = "packageId")
    PackageEntity packageEntity;

    @OneToOne
    @JoinColumn(name = "attachmentId")
    Attachment attachment;

    String projectName;
    String description;

    @Enumerated(EnumType.STRING)
    ProjectStatus status;

    LocalDateTime createAt;
}
