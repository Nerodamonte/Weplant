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
    private Long projectId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "templateId")
    private Template template;

    @ManyToOne
    @JoinColumn(name = "paymentId")
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "packageId")
    private PackageEntity packageEntity;

    @OneToOne
    @JoinColumn(name = "attachmentId")
    private Attachment attachment;

    private String projectName;
    private String description;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    private LocalDateTime createAt;
}
