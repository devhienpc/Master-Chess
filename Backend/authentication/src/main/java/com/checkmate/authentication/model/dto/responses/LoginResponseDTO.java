package com.checkmate.authentication.model.dto.responses;

import lombok.Data;

import java.util.HashMap;

@Data
public class LoginResponseDTO {
    private boolean failure;
    private HashMap<String, String> fields;

    private String RefreshToken;
    private String AccessToken;

    public LoginResponseDTO() {
        failure = false;
        fields = new HashMap<>();
    }
}
