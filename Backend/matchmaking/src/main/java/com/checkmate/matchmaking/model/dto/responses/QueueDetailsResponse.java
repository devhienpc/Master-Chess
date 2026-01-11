package com.checkmate.matchmaking.model.dto.responses;

import lombok.Data;

@Data
public class QueueDetailsResponse {

    private long usersInQueue;
    private long estimatedTime;
    private boolean matchFound = false;

}
