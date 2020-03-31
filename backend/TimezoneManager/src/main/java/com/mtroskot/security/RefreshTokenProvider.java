package com.mtroskot.security;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.mtroskot.model.entity.auth.RefreshToken;
import com.mtroskot.model.entity.auth.User;

@Component
public class RefreshTokenProvider {

	@Value("${app.refreshTokenExpirationInMs}")
	private long refreshTokenExpirationInMs;

	public RefreshToken generateToken(UserDetails userDetails) {

		User user = (User) userDetails;

		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + refreshTokenExpirationInMs);
		return new RefreshToken(UUID.randomUUID().toString(), now, expiryDate, false, user);
	}
	
	public boolean isExpired(RefreshToken refreshToken) {
		Date now = new Date();
		return now.after(refreshToken.getExpiryDate());
	}

	public boolean validateToken(RefreshToken refreshToken) {
		Date now = new Date();
		if (now.after(refreshToken.getExpiryDate()) || refreshToken.isInvalidated()) {
			return false;
		}
		return true;
	}

}
