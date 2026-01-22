package com.checkmate.authentication.model.dto.requests;

import lombok.Data;

@Data
public class LogoutRequestDTO {
    private String RefreshToken;
    private String AccessToken;
}
