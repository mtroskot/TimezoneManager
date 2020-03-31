package com.mtroskot.model.response;

import com.mtroskot.model.entity.auth.RefreshToken;
import com.mtroskot.model.entity.auth.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthenticationResponse {
	private String accessToken;
	private String refreshToken;
	private User user;

	public JwtAuthenticationResponse(String accessToken, RefreshToken refreshToken, User user) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken.getToken();
		this.user = user;
	}
}