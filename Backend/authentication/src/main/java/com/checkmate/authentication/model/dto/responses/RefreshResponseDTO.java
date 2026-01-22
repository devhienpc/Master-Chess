package com.checkmate.authentication.model.dto.responses;

import lombok.Data;

@Data
public class RefreshResponseDTO {
    private String refreshToken;
    private String accessToken;
}
