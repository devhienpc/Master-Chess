package com.checkmate.authentication.model.dto.requests;

import lombok.Data;

@Data
public class ChangePasswordRequestDTO {
    private String password;
    private String token;
}
