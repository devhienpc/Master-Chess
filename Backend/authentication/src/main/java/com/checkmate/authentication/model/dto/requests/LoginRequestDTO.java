package com.checkmate.authentication.model.dto.requests;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String identifier;  // This can be either username or email
    private String password;
}