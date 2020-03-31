package com.mtroskot.model.entity.error;

import java.util.Arrays;
import java.util.List;

import lombok.Data;

@Data
public class ErrorDetails {

	private int status;
	private String message;
	private List<String> errors;

	public ErrorDetails(int status, String message, List<String> errors) {
		this.status = status;
		this.message = message;
		this.errors = errors;
	}

	public ErrorDetails(int status, String message, String error) {
		this.status = status;
		this.message = message;
		errors = Arrays.asList(error);
	}
}