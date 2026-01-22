package com.checkmate.authentication.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.checkmate.authentication.exceptions.UnauthorizedException;
import com.checkmate.authentication.model.entity.UserCredential;
import com.checkmate.authentication.model.entity.UserToken;
import com.checkmate.authentication.repository.UserCredentialsRepository;
import com.checkmate.authentication.repository.UserTokensRepository;
import com.checkmate.authentication.util.PasswordUtil;
import com.checkmate.authentication.util.TokenUtil;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class TokenService {

    @Autowired
    private UserTokensRepository userTokensRepository;

    @Autowired
    private UserCredentialsRepository userCredentialsRepository;

    private static final long ACCESS_TOKEN_EXPIRY_TIME = TimeUnit.HOURS.toMillis(1);
    private static final long REFRESH_TOKEN_EXPIRY_TIME= TimeUnit.DAYS.toMillis(14);

    // Authenticate
    @Transactional
    public String[] authenticate(String Identifier, String password) {
        Optional<UserCredential> optionalUserCredentials = userCredentialsRepository.findByIdentifier(Identifier);

        if (optionalUserCredentials.isEmpty()) {
            throw new RuntimeException("Authentication Failure: Invalid Credentials");
        }

        UserCredential userCredentials = optionalUserCredentials.get();
        if (!PasswordUtil.matchPassword(password, userCredentials.getPassword())) {
            throw new RuntimeException("Authentication Failure: Invalid Credentials");
        }

        // 1) generate refresh token
        String refreshToken = generateRefreshToken(userCredentials);
        // 2) generate access token
        String accessToken = generateAccessToken(userCredentials);

        return new String[] {
                refreshToken,
                accessToken
        };
    }

    // Handle Refresh Token
    @Transactional
    public String[] cycleRefreshToken(String token) throws UnauthorizedException {
        DecodedJWT decodedJWT = TokenUtil.validateToken(token);
        System.out.println(decodedJWT);
        if (decodedJWT == null) {
            throw new UnauthorizedException();
        }

        List<String> permissions = decodedJWT.getClaim("permissions").asList(String.class);

        boolean containsRefreshTokenGenerator = false;
        boolean containsAccessTokenGenerator = false;

        for (String permission : permissions) {
            System.out.println(permission);
            if (permission.equals("GENERATE_REFRESH_TOKEN")) {
                containsRefreshTokenGenerator = true;
                if (containsAccessTokenGenerator) {
                    break;
                }
            }
            if (permission.equals("GENERATE_ACCESS_TOKEN")) {
                containsAccessTokenGenerator = true;
                if (containsRefreshTokenGenerator) {
                    break;
                }
            }
        }

        if (!containsAccessTokenGenerator || !containsRefreshTokenGenerator) {
            throw new UnauthorizedException();
        }

        Optional<UserCredential> optionalUserCredential = userCredentialsRepository.findByCredentialId(decodedJWT.getClaim("userId").asLong());

        if (optionalUserCredential.isEmpty()) {
            throw new UnauthorizedException();
        }

        UserCredential userCredential = optionalUserCredential.get();

        Optional<UserToken> optionalUserToken = userTokensRepository.findUserTokenByCredentialAndTokenJwtId(userCredential, decodedJWT.getId());

        if (optionalUserToken.isEmpty()) {
            throw new UnauthorizedException();
        }

        UserToken userToken = optionalUserToken.get();

        userTokensRepository.delete(userToken);

        String refreshToken = generateRefreshToken(userCredential);
        String accessToken = generateAccessToken(userCredential);

        return new String[] {
                refreshToken,
                accessToken
        };
    }

    // Refresh Token Generation
    private String generateRefreshToken(UserCredential userCredential) {
        Date issueDate = new Date(System.currentTimeMillis());
        Date expireDate = new Date(issueDate.getTime() + REFRESH_TOKEN_EXPIRY_TIME);

        List<String> userRoles = new ArrayList<>();
        List<String> userPermissions = new ArrayList<>();

        UUID uuid = UUID.randomUUID();

        userPermissions.add("GENERATE_ACCESS_TOKEN");
        userPermissions.add("GENERATE_REFRESH_TOKEN");

        String refreshToken = TokenUtil.generateToken(issueDate, expireDate, userCredential.getCredentialId(), userRoles, userPermissions, uuid.toString());

        UserToken userToken = new UserToken();
        userToken.setCredential(userCredential);
        userToken.setTokenJwtId(uuid.toString());
        userToken.setCreatedAt(issueDate);
        userToken.setExpiresAt(expireDate);
        userToken.setTokenType(UserToken.TokenType.REFRESH);
        userToken.setTokenStatus(UserToken.TokenStatus.ACTIVE);

        userTokensRepository.save(userToken);

        return refreshToken;
    }

    // Access Token Generation
    private String generateAccessToken(UserCredential userCredential) {
        Date issueDate = new Date(System.currentTimeMillis());
        Date expireDate = new Date(issueDate.getTime() + ACCESS_TOKEN_EXPIRY_TIME);

        List<String> userRoles = new ArrayList<>();
        List<String> userPermissions = new ArrayList<>();
        UUID uuid = UUID.randomUUID();

        userRoles.add("Basic");

        String accessToken = TokenUtil.generateToken(issueDate, expireDate, userCredential.getCredentialId(), userRoles, userPermissions, uuid.toString());

        UserToken userToken = new UserToken();
        userToken.setCredential(userCredential);
        userToken.setTokenJwtId(uuid.toString());
        userToken.setCreatedAt(issueDate);
        userToken.setExpiresAt(expireDate);
        userToken.setTokenType(UserToken.TokenType.ACCESS);
        userToken.setTokenStatus(UserToken.TokenStatus.ACTIVE);

        userTokensRepository.save(userToken);

        return accessToken;
    }

}
