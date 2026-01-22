package com.checkmate.authentication.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.checkmate.authentication.exceptions.UnauthorizedException;
import com.checkmate.authentication.model.dto.requests.LoginRequestDTO;
import com.checkmate.authentication.model.dto.responses.LoginResponseDTO;
import com.checkmate.authentication.model.dto.responses.RefreshResponseDTO;
import com.checkmate.authentication.model.dto.responses.UserContextResponseDTO;
import com.checkmate.authentication.model.entity.UserCredential;
import com.checkmate.authentication.model.entity.UserToken;
import com.checkmate.authentication.model.error.ErrorResponse;
import com.checkmate.authentication.repository.UserCredentialsRepository;
import com.checkmate.authentication.repository.UserTokensRepository;
import com.checkmate.authentication.service.CredentialsService;
import com.checkmate.authentication.service.TokenService;
import com.checkmate.authentication.util.TokenUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.bouncycastle.cert.ocsp.Req;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
public class TokenController {
    @Autowired
    private CredentialsService credentialsService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserTokensRepository userTokensRepository;

    @Autowired
    private UserCredentialsRepository userCredentialsRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginData, HttpServletResponse response, HttpServletRequest request) {
        String[] loginAttempt;
        try {
            loginAttempt = tokenService.authenticate(loginData.getIdentifier(), loginData.getPassword());
        } catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setStatus(409);
            err.setError("Conflict");
            err.setMessage("Authentication Failure");
            return ResponseEntity.status(409).body(err);
        }
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        // login attempt will return credentials
        // create response entity

        String refreshToken = loginAttempt[0];
        String accessToken = loginAttempt[1];

        loginResponseDTO.setRefreshToken(refreshToken);
        loginResponseDTO.setAccessToken(accessToken);

        // Create cookies for the tokens
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // Expires in 7 days

        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setMaxAge(30 * 60); // Expires in 30 minutes

        // Add cookies to response
        response.addCookie(refreshTokenCookie);
        response.addCookie(accessTokenCookie);

        return ResponseEntity.status(201).body(loginAttempt);
    }

    /***
     * @param authToken
     * "Refresh ..."
     *
     * @return
     * Refresh & Access Token | Error
     */
    @GetMapping("/refresh")
    public ResponseEntity<?> useRefreshToken(@RequestHeader("Authorization") String authToken) {

        System.out.println(authToken);

        if (!authToken.startsWith("Refresh ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authToken.substring(8);
        System.out.println(token);

        String[] tokens;
        try {
            tokens = tokenService.cycleRefreshToken(token);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }

        RefreshResponseDTO refreshResponseDTO = new RefreshResponseDTO();

        refreshResponseDTO.setRefreshToken(tokens[0]);
        refreshResponseDTO.setAccessToken(tokens[1]);

        return ResponseEntity.ok().body(refreshResponseDTO);
    }
}

