package com.mtroskot.service;

import java.util.Optional;

import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;

public interface TimezoneEntryService {

	/**
	 * Returns all {@link TimezoneEntry} from database
	 * 
	 * @return Iterable<TimezoneEntry>
	 */
	Iterable<TimezoneEntry> findAll();

	/**
	 * Finds all {@link TimezoneEntry} from user
	 * 
	 * @param user The user whose {@link TimezoneEntry} we are retrieving
	 * @return Iterable<TimezoneEntry>
	 */
	Iterable<TimezoneEntry> findAllByUser(User user);

	/**
	 * Finds all {@link TimezoneEntry} from user by entry name or entry city name
	 * 
	 * @param userId The id of user
	 * @param input  The search input
	 * @return Iterable<TimezoneEntry>
	 */
	Iterable<TimezoneEntry> findAllByUserAndNameOrCityName(Long userId, String input);

	/**
	 * Finds all {@link TimezoneEntry} by entry name or entry city name
	 * 
	 * @param input The search input
	 * @return Iterable<TimezoneEntry>
	 */
	Iterable<TimezoneEntry> findAllByNameOrCityName(String input);

	/**
	 * Finds {@link TimezoneEntry} by id
	 * 
	 * @param id The id of {@link TimezoneEntry} being searched
	 * @return Optional<TimezoneEntry>
	 */
	Optional<TimezoneEntry> findById(Long id);

	/**
	 * Saves {@link TimezoneEntry}
	 * 
	 * @param timezoneEntry
	 * @return TimezoneEntry
	 */
	TimezoneEntry save(TimezoneEntry timezoneEntry);

	/**
	 * Deletes {@link TimezoneEntry} from database by entry id
	 * 
	 * @param timezoneEntryId The id of {@link TimezoneEntry} being deleted
	 */
	void delete(Long timezoneEntryId);
}
