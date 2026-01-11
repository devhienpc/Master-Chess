package com.checkmate.notifications.model.dto.requests;

import lombok.Data;

import java.io.Serializable;

@Data
public class VerificationMessage implements Serializable {
    private static final long serialVersionUID = 1L;

    private String email;
    private String token;
    private String userId;

    // Getters, setters, and constructors
}