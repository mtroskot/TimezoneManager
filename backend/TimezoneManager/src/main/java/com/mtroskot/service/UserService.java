package com.mtroskot.service;

import java.util.Optional;

import com.mtroskot.model.entity.auth.Role.RoleType;
import com.mtroskot.model.entity.auth.User;

public interface UserService {

	/**
	 * Gets all users from database.
	 * 
	 * @return Iterable<User>
	 */
	Iterable<User> findAll();

	/**
	 * Filters all users in database by inputs.
	 * 
	 * @return Iterable<User>
	 */
	Iterable<User> filterUsers(String emailAddress, String firstName, String lastName);

	/**
	 * Finds user by userId.
	 * 
	 * @param id The id of user.
	 * @return Optional<User>
	 */
	Optional<User> findById(Long userId);

	/**
	 * Finds user by emailAddress.
	 * 
	 * @param email The emailAddress of user.
	 * @return Optional<User>
	 */
	Optional<User> findByEmailAddress(String emailAddress);

	/**
	 * Saves user in database
	 * 
	 * @param user           The user to be saved.
	 * @param encodePassword Indicates if should the password be encoded when saving
	 *                       the user in database.Should be false if the password
	 *                       was previously encoded, and true if the password is in
	 *                       plain text.
	 * @return User
	 */
	User save(User user, boolean encodePassword);

	/**
	 * Checks if a user exists by {@code email}
	 * 
	 * @param email The emailAddress of user.
	 * @return Boolean
	 */
	Boolean existsByEmailAddressIgnoreCase(String emailAddress);

	/**
	 * Deletes user from database by id.
	 * 
	 * @param userId
	 */
	void delete(Long userId);

	/**
	 * Changes user role
	 * 
	 * @param user     The user whose roles will be updated
	 * @param roleType The roleType which the user will have after update
	 * @return User The udapted user
	 */
	User changeUserRole(User user, RoleType roleType);

}
