package com.mtroskot.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class GMTValidator implements ConstraintValidator<GMTConstraint, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		return value.matches("^[0]|([+-]([1-9]|1[0-2]))$");
	}

}
