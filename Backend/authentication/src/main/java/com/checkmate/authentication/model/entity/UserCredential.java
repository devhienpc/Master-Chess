package com.checkmate.authentication.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@ToString
@Table(name = "user_credentials")
public class UserCredential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_credential_id")
    private Long credentialId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username")
    private String username;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "password")
    private String password;

    @Column(name = "email_verified")
    private Boolean emailVerified;

    @OneToMany
    @JoinColumn(name = "user_role_id")
    private Set<UserRole> userRoles;

    @OneToMany
    @JoinColumn(name = "user_permission_id")
    private Set<UserPermission> userPermission;

    @CreationTimestamp
    @Column(name= "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_login")
    private LocalDateTime updatedAt;

}
