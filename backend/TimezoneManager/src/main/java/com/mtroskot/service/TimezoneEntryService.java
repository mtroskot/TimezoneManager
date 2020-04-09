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
	 * Finds {@link TimezoneEntry} by id
	 * 
	 * @param id The id of {@link TimezoneEntry} being searched
	 * @return Optional<TimezoneEntry>
	 */
	Optional<TimezoneEntry> findById(Long id);

	/**
	 * Filters all {@link TimezoneEntry} in database by inputs
	 * 
	 * @return Iterable<TimezoneEntry>
	 */
	Iterable<TimezoneEntry> filterTimezoneEntries(String cityName, String name, String gmt);

	/**
	 * Returns all user {@link TimezoneEntry} from database
	 * 
	 * @return Iterable<TimezoneEntry>
	 */
	Iterable<TimezoneEntry> findByUser(User user);

	/**
	 * Filters all {@link TimezoneEntry} in database
	 * 
	 * @return Iterable<TimezoneEntry>
	 */
	Iterable<TimezoneEntry> filterUserTimezoneEntries(User user, String cityName, String name, String gmt);

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
