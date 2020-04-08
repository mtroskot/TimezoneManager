package com.mtroskot.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;

@Repository
public interface TimezoneEntryRepository
		extends CrudRepository<TimezoneEntry, Long>, JpaSpecificationExecutor<TimezoneEntry> {

	Iterable<TimezoneEntry> findByUser(User user);

}
