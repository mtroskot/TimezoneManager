package com.mtroskot.service.impl;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mtroskot.model.entity.auth.RefreshToken;
import com.mtroskot.repository.RefreshTokenRepository;
import com.mtroskot.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

	private final RefreshTokenRepository refreshTokenRepository;

	@Override
	public RefreshToken save(RefreshToken refreshToken) {
		return refreshTokenRepository.save(refreshToken);
	}

	@Override
	public Optional<RefreshToken> getValidRefreshTokenByUserId(String token, Long userId) {
		return refreshTokenRepository.getValidRefreshTokenByUserId(token, userId);
	}

}
