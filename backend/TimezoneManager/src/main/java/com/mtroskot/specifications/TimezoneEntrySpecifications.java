package com.mtroskot.specifications;

import javax.persistence.criteria.Join;

import org.springframework.data.jpa.domain.Specification;

import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;

public final class TimezoneEntrySpecifications extends ModelSpecification<TimezoneEntry> {

	private static final long serialVersionUID = 1765220695523110197L;

	public TimezoneEntrySpecifications(SearchCriteria criteria) {
		super(criteria);
	}

	public static Specification<TimezoneEntry> getTimezoneEntryByUser(Long userId) {
		return (root, query, criteriaBuilder) -> {
			Join<TimezoneEntry, User> userJoin = root.join("user");
			return criteriaBuilder.equal(userJoin.get("id"), userId);
		};
	}

}
