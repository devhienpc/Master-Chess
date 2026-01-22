package com.checkmate.authentication.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;


@Entity
@Data
@Table(name = "user_tokens")
public class UserToken {
    public enum TokenType {
        ACCESS, REFRESH, TFA
    }

    public enum TokenStatus {
        ACTIVE, EXPIRED, REVOKED
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_token_id")
    private Long tokenId;

    @ManyToOne
    @JoinColumn(name = "user_credential_id", referencedColumnName = "user_credential_id")
    private UserCredential credential;

    @Column(name = "token_type")
    private TokenType tokenType;

    @Column(name = "token_jwt_id")
    private String tokenJwtId;

    @Column(name = "token_status")
    private TokenStatus tokenStatus; // active, expired, revoked

    @CreationTimestamp
    @Column(name= "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Column(name= "expires_at")
    private Date expiresAt;

    @Column(name= "revoked_at")
    private Date revokedAt;

    @Column(name= "last_used_at")
    private Date lastUsedAt;

}
