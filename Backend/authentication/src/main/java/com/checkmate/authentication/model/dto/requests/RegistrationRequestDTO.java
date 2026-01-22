package com.checkmate.authentication.model.dto.requests;

import lombok.*;

@Data
public class RegistrationRequestDTO {
        private String username;
        private String password;
        private String emailAddress;
        private String dateOfBirth;
}
