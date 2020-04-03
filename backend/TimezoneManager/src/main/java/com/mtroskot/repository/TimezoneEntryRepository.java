package com.mtroskot.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;

@Repository
public interface TimezoneEntryRepository extends CrudRepository<TimezoneEntry, Long> {
	/**
	 * Finds all {@link TimezoneEntry} from user
	 * 
	 * @param user The user whose {@link TimezoneEntry} we are searching
	 * @return Iterable<TimezoneEntry>
	 */
	Iterable<TimezoneEntry> findAllByUser(User user);

	/**
	 * Finds all {@link TimezoneEntry} by entry name or entry cityName
	 * 
	 * @param input The search input
	 * @return Iterable<TimezoneEntry>
	 */
	@Query(value = "SELECT * FROM TIMEZONE_ENTRY WHERE LOWER(name) LIKE LOWER(concat('%',:input,'%')) OR LOWER(city_Name) LIKE LOWER(concat('%',:input,'%'))", nativeQuery = true)
	Iterable<TimezoneEntry> findAllByNameOrCityName(String input);

	/**
	 * Finds all {@link TimezoneEntry} from user by entry name or entry cityName
	 * 
	 * @param userId The user whose {@link TimezoneEntry} we are searching
	 * @param input  The search input
	 * @return
	 */
	@Query(value = "SELECT * FROM TIMEZONE_ENTRY WHERE user_Id = :userId AND LOWER(name) LIKE LOWER(concat('%',:input,'%'))"
			+ " OR LOWER(city_Name) LIKE LOWER(concat('%',:input,'%'))", nativeQuery = true)
	Iterable<TimezoneEntry> findAllByUserAndNameOrCityName(Long userId, String input);

}
