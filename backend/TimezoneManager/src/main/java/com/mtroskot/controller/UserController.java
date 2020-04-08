package com.mtroskot.controller;

import java.util.Set;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.mtroskot.model.entity.auth.Role;
import com.mtroskot.model.entity.auth.Role.RoleType;
import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;
import com.mtroskot.model.request.UpdateUserInfoRequest;
import com.mtroskot.service.TimezoneEntryService;
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
	private final TimezoneEntryService timezoneEntryService;
	private final UserService userService;

	/**
	 * Returns all users from database
	 * 
	 * @return Iterable<User>
	 */
	@GetMapping
	public Iterable<User> findAllUsers() {
		return userService.findAll();
	}

	/**
	 * Filters all users by first name,last name, email
	 * 
	 * @param input The search input
	 * @return Iterable<User>
	 */
	@GetMapping("/search")
	public Iterable<User> filterUsers(@RequestParam(name = "emailAddress", required = false) String emailAddress,
			@RequestParam(name = "firstName", required = false) String firstName,
			@RequestParam(name = "lastName", required = false) String lastName) {
		return userService.filterUsers(emailAddress, firstName, lastName);
	}

	/**
	 * Updates user in database.
	 * 
	 * @param updateUserInfoRequest The request which holds updated user
	 *                              information.
	 * @return ResponseEntity<User> The updated user
	 */
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

	/**
	 * Deletes user from database.
	 * 
	 * @param userId The id of user being deleted
	 * @return ResponseEntity<String>
	 */
	@DeleteMapping("/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable("userId") @Positive Long userId) {
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

	/**
	 * Changes user role
	 * 
	 * @param userId   The id of user whose roles will be updated
	 * @param roleType The roleType which the user will have after update
	 * @return ResponseEntity<Set<Role>>
	 */
	@PutMapping("/{userId}/changeRole")
	public ResponseEntity<Set<Role>> changeUserRole(@PathVariable("userId") @Positive Long userId,
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

	/**
	 * Returns all {@link TimezoneEntry} from database for given user.
	 * 
	 * @param user The user whose entries we want to retrieve.
	 * @return Iterable<TimezoneEntry>
	 */
	@GetMapping("/{userId}/timezoneEntries")
	public Iterable<TimezoneEntry> findTimezoneEntriesFromUser(@PathVariable("userId") Long userId) {
		User user = userService.findById(userId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
		return timezoneEntryService.findByUser(user);
	}

	/**
	 * Filters all {@link TimezoneEntry} by entry name or entry cityName
	 * 
	 * @param name The name used for filtering entries
	 * @return Iterable<TimezoneEntry>
	 */
	@GetMapping("/{userId}/timezoneEntries/search")
	public Iterable<TimezoneEntry> filterTimezoneEntries(@PathVariable("userId") Long userId,
			@RequestParam(name = "cityName", required = false) String cityName,
			@RequestParam(name = "name", required = false) String name,
			@RequestParam(name = "gmt", required = false) String gmt) {
		User user = userService.findById(userId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
		return timezoneEntryService.filterUserTimezoneEntries(user, cityName, name, gmt);
	}

}
