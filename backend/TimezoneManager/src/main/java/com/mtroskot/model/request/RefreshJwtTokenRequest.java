package com.mtroskot.model.request;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class RefreshJwtTokenRequest {

	@NotBlank
	private String accessToken;

	@NotBlank
	private String refreshToken;
}
