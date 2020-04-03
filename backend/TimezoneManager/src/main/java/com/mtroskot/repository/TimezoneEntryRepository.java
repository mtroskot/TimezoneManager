package com.mtroskot.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;

@Repository
public interface TimezoneEntryRepository extends CrudRepository<TimezoneEntry, Long> {

	Iterable<TimezoneEntry> findAllByUser(User user);

	@Query(value = "SELECT * FROM TIMEZONE_ENTRY WHERE LOWER(name) LIKE LOWER(concat('%',:input,'%')) OR LOWER(city_Name) LIKE LOWER(concat('%',:input,'%'))", nativeQuery = true)
	Iterable<TimezoneEntry> findAllByNameOrCityName(String input);

	@Query(value = "SELECT * FROM TIMEZONE_ENTRY WHERE user_Id = :userId AND ( LOWER(name) LIKE LOWER(concat('%',:input,'%'))"
			+ " OR LOWER(city_Name) LIKE LOWER(concat('%',:input,'%')) )", nativeQuery = true)
	Iterable<TimezoneEntry> findAllByUserAndNameOrCityName(Long userId, String input);

}
