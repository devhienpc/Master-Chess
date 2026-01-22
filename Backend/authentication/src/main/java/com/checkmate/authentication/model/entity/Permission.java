package com.checkmate.authentication.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@ToString
@Table(name = "permissions")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "permission_id")
    private Long permissionId;

    @Column(name = "permission_name")
    private String permissionName;

    @CreationTimestamp
    @Column(name= "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

}
