package com.checkmate.authentication.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;

    @OneToMany
    @JoinColumn(name = "permission_id")
    private Set<Permission> permissions;

    @CreationTimestamp
    @Column(name= "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

}
