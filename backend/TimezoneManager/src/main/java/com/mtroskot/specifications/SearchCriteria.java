package com.mtroskot.specifications;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SearchCriteria {
	private String key;
	private Operation operation;
	private Object value;

	public static enum Operation {
		GREATER_THAN, LESS_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN_OR_EQUAL, EQUAL, EQUAL_IGNORE_CASE, LIKE,
		LIKE_IGNORE_CASE
	}
}
