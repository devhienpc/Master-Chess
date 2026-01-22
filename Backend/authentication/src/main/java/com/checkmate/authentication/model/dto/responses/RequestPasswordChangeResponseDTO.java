package com.checkmate.authentication.model.dto.responses;

import lombok.Data;

import java.util.HashMap;

@Data
public class RequestPasswordChangeResponseDTO {
    private boolean failure;
    private HashMap<String, String> fields;

    public RequestPasswordChangeResponseDTO() {
        failure = false;
        fields = new HashMap<>();
    }

}
