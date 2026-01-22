package com.checkmate.authentication.repository;

import com.checkmate.authentication.model.entity.UserCredential;
import com.checkmate.authentication.model.entity.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserTokensRepository extends JpaRepository<UserToken, Long> {

    Optional<Set<UserToken>> findUserTokensByCredential(UserCredential credential);

    Optional<UserToken> findUserTokenByCredentialAndTokenJwtId(UserCredential credential, String jwtId);
}
