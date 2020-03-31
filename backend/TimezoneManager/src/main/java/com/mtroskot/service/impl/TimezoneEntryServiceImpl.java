package com.mtroskot.service.impl;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;
import com.mtroskot.repository.TimezoneEntryRepository;
import com.mtroskot.service.TimezoneEntryService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TimezoneEntryServiceImpl implements TimezoneEntryService {

	private final TimezoneEntryRepository timezoneEntryRepository;

	@Override
	public Iterable<TimezoneEntry> findAll() {
		return timezoneEntryRepository.findAll();
	}

	@Override
	public Optional<TimezoneEntry> findById(Long timezoneEntryId) {
		return timezoneEntryRepository.findById(timezoneEntryId);
	}

	@Override
	public TimezoneEntry save(TimezoneEntry timezoneEntry) {
		return timezoneEntryRepository.save(timezoneEntry);
	}

	@Override
	public void delete(Long timezoneEntryId) {
		timezoneEntryRepository.deleteById(timezoneEntryId);
	}

	@Override
	public Iterable<TimezoneEntry> findAllByUser(User user) {
		return timezoneEntryRepository.findAllByUser(user);
	}

	@Override
	public Iterable<TimezoneEntry> findAllByUserAndNameOrCityName(Long userId, String input) {
		return timezoneEntryRepository.findAllByUserAndNameOrCityName(userId, input);
	}

	@Override
	public Iterable<TimezoneEntry> findAllByNameOrCityName(String input) {
		return timezoneEntryRepository.findAllByNameOrCityName(input);
	}

}
