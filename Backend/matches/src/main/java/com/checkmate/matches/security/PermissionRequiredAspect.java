package com.checkmate.matches.security;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.checkmate.matches.util.TokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;

@Aspect
@Component
public class PermissionRequiredAspect {


    private static final Logger logger = LoggerFactory.getLogger(PermissionRequiredAspect.class);

    @Around("@annotation(permissionRequired)")
    public Object validateRole(ProceedingJoinPoint joinPoint, PermissionRequired permissionRequired) throws Throwable {

        logger.info("permissionRequired invoked...");


        System.out.println("Validating roles...");
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String authorization = request.getHeader("Authorization");

        // Check if Authorization header is present and bearer token is there
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Authorization token is missing or not Bearer.");
        }

        // Extract token
        String token = authorization.substring(7); // Skip "Bearer "
        DecodedJWT decodedJWT = TokenUtil.validateToken(token);

        // Check if token is valid
        if (decodedJWT == null) {
            return ResponseEntity.status(401).body("Invalid Authorization token.");
        }

        // Check for required roles in the annotation
        String[] requiredPermissions = permissionRequired.value();
        boolean hasRequiredRole = Arrays.stream(requiredPermissions)
                .anyMatch(role -> decodedJWT.getClaim("roles").asList(String.class).contains(role));

        if (requiredPermissions.length == 0) {
            hasRequiredRole = true;
        }

        // If user does not have the required role, prevent method execution
        if (!hasRequiredRole) {
            return ResponseEntity.status(403).body("User does not have the required role.");
        }

        request.setAttribute("decodedJWT", decodedJWT);

        // If roles are valid, proceed with the method execution
        return joinPoint.proceed();
    }
}
