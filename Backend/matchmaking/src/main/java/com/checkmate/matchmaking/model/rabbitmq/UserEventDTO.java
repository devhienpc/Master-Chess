package com.checkmate.matchmaking.model.rabbitmq;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEventDTO {

    private long userId;
    private UserEventType eventType;
    private Map<String, String> additionalDetails = new HashMap<>();

    // Add any additional methods or business logic here
    public void addAdditionalDetails(String key, String value) {
        this.additionalDetails.put(key, value);
    }
}
