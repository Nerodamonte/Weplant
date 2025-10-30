package com.Weplant.entities;

import com.Weplant.enums.AccountStatus;
import com.Weplant.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long userId;

    String fullName;
    String email;
    String password;
    Long phoneNumber;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<TemplateOwner> ownedTemplates;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Payment> payments;

    @Enumerated(EnumType.STRING)
    AccountStatus status;

    @Enumerated(EnumType.STRING)
    Role role;

    LocalDateTime createAt;

    @OneToMany(mappedBy = "user")
    List<Project> projects;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(role); // vì enum Role implements GrantedAuthority
    }

    @Override
    public String getPassword() {
        return password; // field password của bạn
    }

    @Override
    public String getUsername() {
        return email; // login bằng email
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // nếu không quản lý expire thì để true
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // nếu không quản lý lock thì để true
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // nếu không quản lý credential expire thì để true
    }

    @Override
    public boolean isEnabled() {
        return true; // nếu không quản lý disable thì để true
    }
}
