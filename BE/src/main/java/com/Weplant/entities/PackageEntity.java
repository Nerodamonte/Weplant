package com.Weplant.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "packages")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PackageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long packageId;

    String packageName;
    String packageDescription;
    Long packagePrice;

    @OneToMany(mappedBy = "packageEntity", cascade = CascadeType.ALL)
    List<Project> projects;
}
