package com.mtroskot.model.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogoutRequest {

	@NotBlank
	private String refreshToken;

}