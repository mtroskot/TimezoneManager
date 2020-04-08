package com.mtroskot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mtroskot.model.entity.auth.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>, JpaSpecificationExecutor<User> {

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

}
