package com.checkmate.matchmaking.service;

import com.checkmate.matchmaking.config.RabbitMqConfig;
import com.checkmate.matchmaking.model.entity.Queuer;
import com.checkmate.matchmaking.model.rabbitmq.MatchEventDTO;
import com.checkmate.matchmaking.model.rabbitmq.MatchEventType;
import com.checkmate.matchmaking.repository.QueuerRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class QueueService {

    private static final Logger logger = LoggerFactory.getLogger(QueueService.class);


    @Autowired
    private QueuerRepository queuerRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostConstruct
    public void init() {
        rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
    }

    public Queuer getQueuerByUserId(long userId) {
        Optional<Queuer> queuerOptional = queuerRepository.getQueuerByUserId(userId);

        return queuerOptional.orElse(null);
    }

    public void pingUserId(long userId) {

        Queuer q = getQueuerByUserId(userId);

        if (q == null) {
            return;
        }

        q.setLastPing(String.valueOf(System.currentTimeMillis()));

        queuerRepository.save(q);
    }

    public Queuer createQueuer(long userId) {
        Queuer q = new Queuer();
        q.setUserId(userId);
        q.setInQueue(false);
        return queuerRepository.saveAndFlush(q);

    }

    private Queuer findOpponent(Queuer searchingFor, int minElo, int maxElo) {
        Queuer opponent = queuerRepository.findOpponent(searchingFor.getUserId(), minElo, maxElo);

        System.out.println(opponent);
        // no opponent found, return null
        if (opponent == null) {
            return null;
        }

        // opponent was inactive, find another
        if ((Long.parseLong(opponent.getLastPing()) - System.currentTimeMillis()) > 30000) {
            opponent.setInQueue(false);
            queuerRepository.saveAndFlush(opponent);
            return findOpponent(searchingFor, minElo, maxElo);
        }

        if (!opponent.isInQueue()) {
            return null;
        }

        opponent.setInQueue(false);
        searchingFor.setInQueue(false);
        searchingFor.setInMatch(true);
        opponent.setInMatch(true);

        // save and flush so no new matches are made for these users
        queuerRepository.saveAndFlush(searchingFor);
        queuerRepository.saveAndFlush(opponent);

        MatchEventDTO matchmakingEventDTO = new MatchEventDTO();

        matchmakingEventDTO.setEventType(MatchEventType.MATCH_CREATED);

        matchmakingEventDTO.addAdditionalDetails("user1", String.valueOf(searchingFor.getUserId()));
        matchmakingEventDTO.addAdditionalDetails("user2", String.valueOf(opponent.getUserId()));

        logger.info("Creating match with" + searchingFor.getUserId() + ", " + opponent.getUserId());

        rabbitTemplate.convertAndSend(RabbitMqConfig.MATCH_MICROSERVICE_DIRECT_EXCHANGE, "match_microservice_direct_queue", matchmakingEventDTO);

        return opponent;
    }

    public void queueUserId(long userId) {

        Queuer q = getQueuerByUserId(userId);

        // create queuer profile if non exists
        if (q == null) {
           q = createQueuer(userId);
        }

        Queuer opponent = findOpponent(q,q.getElo() - 750, q.getElo() + 750);

        if (opponent == null) {
            logger.info("No Opponent Found, waiting for an opponent to join the queue");
            q.setInQueue(true);
            queuerRepository.save(q);
            return;
        }
        logger.info("Opponent Found, creating match");
    }

    public void dequeueUserId(long userId) {

        Optional<Queuer> queuerOptional = queuerRepository.getQueuerByUserId(userId);
        Queuer q;

        // set queuer
        if (queuerOptional.isEmpty()) {
            return;
        } else {
            q = queuerOptional.get();
        }

        q.setInQueue(false);


        // save and flush so no new matches are made for this users, probably a better way to do handle this ACID
        queuerRepository.saveAndFlush(q);

    }

}
