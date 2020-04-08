package com.mtroskot.service.impl;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;
import com.mtroskot.repository.TimezoneEntryRepository;
import com.mtroskot.service.TimezoneEntryService;
import com.mtroskot.specifications.SearchCriteria;
import com.mtroskot.specifications.SearchCriteria.Operation;
import com.mtroskot.specifications.TimezoneEntrySpecifications;

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
	public Iterable<TimezoneEntry> filterTimezoneEntries(String cityName, String name, String differenceToGMT) {
		TimezoneEntrySpecifications spec1 = new TimezoneEntrySpecifications(
				new SearchCriteria("cityName", Operation.LIKE_IGNORE_CASE, cityName));
		TimezoneEntrySpecifications spec2 = new TimezoneEntrySpecifications(
				new SearchCriteria("name", Operation.LIKE_IGNORE_CASE, name));
		TimezoneEntrySpecifications spec3 = new TimezoneEntrySpecifications(
				new SearchCriteria("differenceToGMT", Operation.EQUAL, differenceToGMT));

		return timezoneEntryRepository.findAll(spec1.or(spec2).or(spec3));
	}

	@Override
	public Iterable<TimezoneEntry> filterUserTimezoneEntries(User user, String cityName, String name,
			String differenceToGMT) {
		TimezoneEntrySpecifications spec1 = new TimezoneEntrySpecifications(
				new SearchCriteria("user", Operation.EQUAL, user));
		TimezoneEntrySpecifications spec2 = new TimezoneEntrySpecifications(
				new SearchCriteria("cityName", Operation.LIKE_IGNORE_CASE, cityName));
		TimezoneEntrySpecifications spec3 = new TimezoneEntrySpecifications(
				new SearchCriteria("name", Operation.LIKE_IGNORE_CASE, name));
		TimezoneEntrySpecifications spec4 = new TimezoneEntrySpecifications(
				new SearchCriteria("differenceToGMT", Operation.EQUAL, differenceToGMT));

		return timezoneEntryRepository.findAll(spec1.and(spec2.or(spec3).or(spec4)));
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
	public Iterable<TimezoneEntry> findByUser(User user) {
		return timezoneEntryRepository.findByUser(user);
	}

}
