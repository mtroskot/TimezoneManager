package com.mtroskot.controller;

import java.util.Set;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.mtroskot.model.entity.auth.Role;
import com.mtroskot.model.entity.auth.Role.RoleType;
import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.request.UpdateUserInfoRequest;
import com.mtroskot.service.UserService;
import com.sun.istack.NotNull;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "users", produces = "application/json")
@Slf4j
@Validated
public class UserController {

	private final UserService userService;

	@GetMapping("/all")
	public Iterable<User> findAllUsers() {
		return userService.findAll();
	}

	@GetMapping("/filter")
	public Iterable<User> filterUsers(@RequestParam("input") @NotBlank String input) {
		return userService.findAllByFirstNameOrLastNameOrEmailAddress(input);
	}

	@PutMapping(consumes = "application/json")
	public ResponseEntity<User> updateUser(@Valid @RequestBody UpdateUserInfoRequest updateUserInfoRequest) {
		try {
			User userToUpdate = userService.findById(updateUserInfoRequest.getId())
					.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
			userToUpdate.setEmailAddress(updateUserInfoRequest.getEmailAddress());
			userToUpdate.setFirstName(updateUserInfoRequest.getFirstName());
			userToUpdate.setLastName(updateUserInfoRequest.getLastName());
			boolean encodePassword = false;
			User updatedUser = userService.save(userToUpdate, encodePassword);
			return new ResponseEntity<>(updatedUser, HttpStatus.OK);
		} catch (NumberFormatException e) {
			log.error(e.getMessage());
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	@DeleteMapping()
	public ResponseEntity<String> deleteUser(@RequestParam("userId") @Positive Long userId) {
		try {
			userService.findById(userId)
					.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
			userService.delete(userId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NumberFormatException e) {
			log.error(e.getMessage());
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	@PutMapping("/changeRole")
	public ResponseEntity<Set<Role>> changeUserRole(@RequestParam("userId") @Positive Long userId,
			@RequestParam("role") @NotNull RoleType roleType) {
		try {
			User userToUpdate = userService.findById(userId)
					.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
			User updatedUser = userService.changeUserRole(userToUpdate, roleType);
			return new ResponseEntity<>(updatedUser.getRoles(), HttpStatus.OK);
		} catch (NumberFormatException e) {
			log.error(e.getMessage());
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}
}
