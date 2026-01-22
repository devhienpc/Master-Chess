package com.checkmate.authentication.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "user_roles")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_role_id")
    private Long userRoleId;

    @ManyToOne
    @JoinColumn(name = "roleId")
    private Role role;

    @CreationTimestamp
    @Column(name= "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
