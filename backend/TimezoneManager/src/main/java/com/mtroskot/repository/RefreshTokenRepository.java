package com.mtroskot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.mtroskot.model.entity.auth.RefreshToken;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

	/**
	 * Returns refresh token if it found by user id and still valid
	 * 
	 * @param token  The refresh token
	 * @param userId The id of user for which we are searching the token
	 * @return Optional<RefreshToken>
	 */
	@Query(value = "SELECT rt FROM RefreshToken rt WHERE rt.token= :token AND rt.user.id = :userId AND rt.invalidated=false")
	Optional<RefreshToken> getValidRefreshTokenByUserId(String token, Long userId);

}
