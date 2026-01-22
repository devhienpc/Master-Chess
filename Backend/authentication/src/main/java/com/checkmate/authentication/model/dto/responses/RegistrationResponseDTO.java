package com.checkmate.authentication.model.dto.responses;

import lombok.Data;

import java.util.HashMap;

@Data
public class RegistrationResponseDTO {
    private boolean failure;
    private HashMap<String, String> fields;

    public RegistrationResponseDTO() {
        failure = false;
        fields = new HashMap<>();
    }
}
