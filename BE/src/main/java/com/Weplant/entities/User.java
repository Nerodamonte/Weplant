package com.Weplant.entities;

import com.Weplant.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long userId;

    String fullName;
    String email;
    String password;
    Long phoneNumber;

    @Enumerated(EnumType.STRING)
    Role role;

    LocalDateTime createAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Project> projects;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Payment> payments;
}
