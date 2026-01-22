package com.checkmate.authentication.model.dto.responses;

import lombok.Data;

import java.util.HashMap;

@Data
public class ChangePasswordResponseDTO {
    private boolean failure;
    private HashMap<String, String> fields;

    public ChangePasswordResponseDTO() {
        failure = false;
        fields = new HashMap<>();
    }

}
