package com.checkmate.authentication.model.dto.responses;

import lombok.Data;

import java.util.HashMap;

@Data
public class VerificationResponseDTO {
    private boolean failure;
    private HashMap<String, String> fields;

    public VerificationResponseDTO() {
        failure = false;
        fields = new HashMap<>();
    }

}
