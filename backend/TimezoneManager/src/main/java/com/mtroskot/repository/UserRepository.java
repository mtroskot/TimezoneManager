package com.mtroskot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mtroskot.model.entity.auth.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	/**
	 * Checks if a user exists by {@code emailAddress} case insensitive.
	 * 
	 * @param emailAddress The email of user.
	 * @return Boolean
	 */
	Boolean existsByEmailAddressIgnoreCase(String emailAddress);

	/**
	 * Finds user by his email address
	 * 
	 * @param emailAddress The email address of user
	 * @return Optional<User>
	 */
	Optional<User> findByEmailAddress(String emailAddress);

	/**
	 * Finds all user by email address, firstName, lastName
	 * 
	 * @param input The search input
	 * @return Iterable<User>
	 */
	@Query(value = "SELECT * FROM user WHERE LOWER(first_Name) LIKE LOWER(concat('%',:input,'%')) or LOWER(last_Name) LIKE LOWER(concat('%',:input,'%')) "
			+ "OR LOWER(email_Address) LIKE LOWER(concat('%',:input,'%'))", nativeQuery = true)
	Iterable<User> findByLikeEmailAddressOrFirstNameOrLastName(String input);

}
