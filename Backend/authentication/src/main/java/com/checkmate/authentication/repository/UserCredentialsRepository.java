package com.checkmate.authentication.repository;

import com.checkmate.authentication.model.entity.UserCredential;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCredentialsRepository extends JpaRepository<UserCredential, Long> {
    Optional<UserCredential> findByUsername(String username);
    Optional<UserCredential> findByEmailAddress(String email);
    Optional<UserCredential> findByCredentialId(Long c);

    @Query(value = "SELECT * FROM user_credentials WHERE (email_address = :identifier AND :identifier ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$') OR (username = :identifier AND NOT (:identifier ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$'))", nativeQuery = true)
    Optional<UserCredential> findByIdentifier(@Param("identifier") String identifier);
}
