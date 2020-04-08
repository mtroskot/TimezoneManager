package com.mtroskot.specifications;

import java.text.MessageFormat;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ModelSpecification<T> implements Specification<T> {

	private static final long serialVersionUID = 8996404057943185313L;
	private SearchCriteria criteria;

	@Override
	public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		if (criteria.getValue() == null) {
			return null;
		}
		switch (criteria.getOperation()) {
		case GREATER_THAN:
			return criteriaBuilder.greaterThan(root.<String>get(criteria.getKey()), criteria.getValue().toString());
		case GREATER_THAN_OR_EQUAL:
			return criteriaBuilder.greaterThanOrEqualTo(root.<String>get(criteria.getKey()),
					criteria.getValue().toString());
		case LESS_THAN:
			return criteriaBuilder.lessThan(root.<String>get(criteria.getKey()), criteria.getValue().toString());
		case LESS_THAN_OR_EQUAL:
			return criteriaBuilder.lessThanOrEqualTo(root.<String>get(criteria.getKey()),
					criteria.getValue().toString());
		case EQUAL:
			return criteriaBuilder.equal(root.get(criteria.getKey()), criteria.getValue());
		case EQUAL_IGNORE_CASE:
			return criteriaBuilder.equal(criteriaBuilder.lower(root.<String>get(criteria.getKey())),
					criteria.getValue().toString().toLowerCase());
		case LIKE:
			return criteriaBuilder.like(root.<String>get(criteria.getKey()), contains(criteria.getValue()));
		case LIKE_IGNORE_CASE:
			return criteriaBuilder.like(criteriaBuilder.lower(root.<String>get(criteria.getKey())),
					contains(criteria.getValue().toString().toLowerCase()));
		default:
			return null;
		}
	}

	private static String contains(Object object) {
		return MessageFormat.format("%{0}%", object);
	}
}
