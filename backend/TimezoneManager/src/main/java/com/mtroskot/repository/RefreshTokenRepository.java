package com.mtroskot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.mtroskot.model.entity.auth.RefreshToken;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

	@Query(value = "SELECT * FROM REFRESH_TOKEN WHERE token= :token AND user_id = :userId AND invalidated=false", nativeQuery = true)
	Optional<RefreshToken> getValidRefreshTokenByUserId(String token, Long userId);

}
