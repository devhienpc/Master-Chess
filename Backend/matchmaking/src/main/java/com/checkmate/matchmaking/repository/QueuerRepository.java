package com.checkmate.matchmaking.repository;


import com.checkmate.matchmaking.model.entity.Queuer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QueuerRepository extends JpaRepository<Queuer, Long> {

    Optional<Queuer> getQueuerByUserId(long userId);

    long countByInQueueTrue();

    long countByInQueueTrueAndEloBetween(int minElo, int maxElo);

    @Query(value = "SELECT * FROM queuers WHERE in_queue = true AND elo BETWEEN :minElo AND :maxElo and user_id != :currentUserId LIMIT 1",
            nativeQuery = true)
    Queuer findOpponent(@Param("currentUserId") Long currentUserId, @Param("minElo") int minElo, @Param("maxElo") int maxElo);
}
