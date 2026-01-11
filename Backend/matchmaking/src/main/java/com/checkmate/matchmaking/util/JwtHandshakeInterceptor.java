package com.checkmate.matchmaking.util;

import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.boot.actuate.web.exchanges.HttpExchange;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Arrays;
import java.util.Map;

public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        // Extract the token from the request
        String query = request.getURI().getQuery();


        System.out.println("WS Token Intercepted: " + query);

        if (query == null) {
            // nothing provided

            response.setStatusCode(HttpStatus.UNAUTHORIZED); // Set an appropriate status code
            return false; // Reject the handshake
        } else {
            // something provided, verify token
            try {
                String token = query.split("token=")[1];
                // decode token
                DecodedJWT decodedJWT = TokenUtil.validateToken(token);

                // invalid jwt token
                if (decodedJWT == null) {
                    return false;
                }

                String userId = decodedJWT.getClaim("userId").asString();
                attributes.put("userId", userId);
                request.getHeaders().add("user", userId);

            } catch (IndexOutOfBoundsException e) {
                return false;
            }
        }

        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        // Post-handshake logic (if needed)
    }
}