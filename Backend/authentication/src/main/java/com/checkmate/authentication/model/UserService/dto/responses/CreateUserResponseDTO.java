package com.checkmate.authentication.model.UserService.dto.responses;

import lombok.Data;

@Data
public class CreateUserResponseDTO {
    private boolean failure;
    private String userId;
}
