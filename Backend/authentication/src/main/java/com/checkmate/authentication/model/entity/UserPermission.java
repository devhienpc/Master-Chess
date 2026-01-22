package com.checkmate.authentication.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "user_permissions")
public class UserPermission {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_permission_id")
    private Long userPermissionId;

    @ManyToOne
    @JoinColumn(name = "permissionId")
    private Permission permission;

    @ManyToOne
    @JoinColumn(name = "user_credential_id")
    private UserCredential userCredential;

    @CreationTimestamp
    @Column(name= "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

}
