package com.checkmate.matchmaking.model.rabbitmq;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class MatchEventDTO {
    private MatchEventType eventType;
    private Map<String, String> additionalDetails = new HashMap<>();
    public void addAdditionalDetails(String key, String value) {
        this.additionalDetails.put(key, value);
    }
}
