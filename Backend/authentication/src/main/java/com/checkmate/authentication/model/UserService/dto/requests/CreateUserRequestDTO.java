package com.checkmate.authentication.model.UserService.dto.requests;

import lombok.Data;

@Data
public class CreateUserRequestDTO {
    private String credentialsId;
    private String username;  // This can be either username or email
    private String emailAddress;
    private String dateOfBirth;

    private String token;
}