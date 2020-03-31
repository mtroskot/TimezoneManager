package com.mtroskot.service;

import java.util.Optional;

import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;

public interface TimezoneEntryService {

	Iterable<TimezoneEntry> findAll();

	Iterable<TimezoneEntry> findAllByUser(User user);

	Iterable<TimezoneEntry> findAllByUserAndNameOrCityName(Long userId, String input);

	Iterable<TimezoneEntry> findAllByNameOrCityName(String input);

	Optional<TimezoneEntry> findById(Long id);

	TimezoneEntry save(TimezoneEntry timezoneEntry);

	void delete(Long timezoneEntryId);
}
