package com.mtroskot.model.request;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.mtroskot.model.entity.auth.Role;
import com.mtroskot.model.entity.auth.User;

import lombok.Data;

@Data
public class RegisterRequest {

	@NotBlank
	@Pattern(regexp = "^[A-Za-z ]{2,20}$", message = "Invalid firstName format")
	private String firstName;

	@NotBlank
	@Pattern(regexp = "^[A-Za-z ]{2,20}$", message = "Invalid lastName format")
	private String lastName;

	@NotBlank
	@Email
	private String emailAddress;

	@NotBlank
	@Size(min = 6, max = 20)
	private String password;
	@NotBlank
	@Size(min = 6, max = 20)
	private String matchingPassword;

	public User toUser(Set<Role> roles) {
		User user = new User(emailAddress.toLowerCase(), firstName, lastName, password);
		user.getRoles().addAll(roles);
		return user;
	}
}
