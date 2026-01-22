package com.checkmate.authentication.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {
    public static final String VERIFICATION_QUEUE = "verification_email_queue";
    public static final String USER_EVENTS_EXCHANGE = "user_events_exchange";

    @Bean
    public FanoutExchange userEventsExchange() {
        return new FanoutExchange(USER_EVENTS_EXCHANGE);
    }

    @Bean
    public Queue verificationEmailQueue() {
        return new Queue(VERIFICATION_QUEUE);
    }


    @Bean
    public Binding binding(Queue verificationEmailQueue, FanoutExchange userEventsExchange) {
        return BindingBuilder.bind(verificationEmailQueue).to(userEventsExchange);
    }

    public static final String MATCHMAKING_MICROSERVICE_DIRECT_EXCHANGE = "matchmaking_microservice_direct_exchange";


    public static final String MATCH_MICROSERVICE_QUEUE = "match_microservice_queue";
    public static final String MATCH_MICROSERVICE_EXCHANGE = "match_microservice_exchange";

    @Bean
    Queue matchMicroserviceQueue() {
        return new Queue(MATCH_MICROSERVICE_QUEUE, true);
    }
    @Bean
    FanoutExchange matchMicroserviceExchange() {
        return new FanoutExchange(MATCH_MICROSERVICE_EXCHANGE);
    }
    @Bean
    Binding bindingMatchMicroservice(Queue matchMicroserviceQueue, FanoutExchange matchMicroserviceExchange) {
        return BindingBuilder.bind(matchMicroserviceQueue).to(matchMicroserviceExchange);
    }


    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
