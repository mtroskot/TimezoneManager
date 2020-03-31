package com.mtroskot.model.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
	
	@NotBlank
	@Email
	private String emailAddress;

	@NotBlank
	@Size(min = 6, max = 20)
	private String password;

}