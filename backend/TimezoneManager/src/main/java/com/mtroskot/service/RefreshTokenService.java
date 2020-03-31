package com.mtroskot.service;

import java.util.Optional;

import com.mtroskot.model.entity.auth.RefreshToken;

public interface RefreshTokenService {

	RefreshToken save(RefreshToken refreshToken);

	Optional<RefreshToken> getValidRefreshTokenByUserId(String token, Long userId);

}
