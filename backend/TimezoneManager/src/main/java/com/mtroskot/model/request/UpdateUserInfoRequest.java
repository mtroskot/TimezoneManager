package com.mtroskot.model.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateUserInfoRequest {

	@Positive
	private Long id;

	@NotBlank
	@Pattern(regexp = "^[A-Za-z ]{2,20}$", message = "Invalid firstName format")
	private String firstName;

	@NotBlank
	@Pattern(regexp = "^[A-Za-z ]{2,20}$", message = "Invalid lastName format")
	private String lastName;

	@NotBlank
	@Email
	private String emailAddress;
}
