package com.checkmate.users.model.error;

import lombok.Data;

@Data
public class ErrorResponse {
    private int status;
    private String error;
    private String message;
}
