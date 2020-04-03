package com.mtroskot.service;

import java.util.Optional;

import com.mtroskot.model.entity.auth.RefreshToken;

public interface RefreshTokenService {

	/**
	 * Saves refresh token to database.
	 * 
	 * @param refreshToken The RefreshToken to be saved
	 * @return RefreshToken The saved RefreshToken
	 */
	RefreshToken save(RefreshToken refreshToken);

	/**
	 * Finds refresh token for user if present and token valid
	 * 
	 * @param token  The refreshToken from user
	 * @param userId The id of user
	 * @return Optional<RefreshToken>
	 */
	Optional<RefreshToken> getValidRefreshTokenByUserId(String token, Long userId);

}
