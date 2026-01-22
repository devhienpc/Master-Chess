package com.checkmate.authentication.controller;

import com.checkmate.authentication.model.dto.requests.*;
import com.checkmate.authentication.model.dto.responses.*;
import com.checkmate.authentication.model.error.ErrorResponse;
import com.checkmate.authentication.service.CredentialsService;
import com.checkmate.authentication.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RegistrationController {

    @Autowired
    private CredentialsService credentialsService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequestDTO registrationData, HttpServletResponse response, HttpServletRequest request){

        RegistrationResponseDTO regAttempt = credentialsService.register(
                registrationData.getUsername(),
                registrationData.getPassword(),
                registrationData.getEmailAddress(),
                registrationData.getDateOfBirth()
        );

        if (regAttempt.isFailure()) {
            System.out.println(regAttempt);
            return ResponseEntity.status(409).body(regAttempt);
        }

        return ResponseEntity.status(200).body(regAttempt);
    }

}
