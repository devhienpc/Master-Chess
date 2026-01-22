package com.checkmate.authentication.model.dto.requests;

import lombok.Data;

@Data
public class VerificationRequestDTO {
    private String token;
    private String userId;
}
