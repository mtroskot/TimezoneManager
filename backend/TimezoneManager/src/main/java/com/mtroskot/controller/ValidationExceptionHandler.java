package com.mtroskot.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.mtroskot.model.response.ErrorDetails;

@RestControllerAdvice
public class ValidationExceptionHandler extends ResponseEntityExceptionHandler {
	private final HttpStatus BAD_REQUEST = HttpStatus.BAD_REQUEST;
	private final HttpStatus NOT_FOUND = HttpStatus.NOT_FOUND;
	private final HttpStatus METHOD_NOT_ALLOWED = HttpStatus.METHOD_NOT_ALLOWED;
	private final HttpStatus UNSUPPORTED_MEDIA_TYPE = HttpStatus.UNSUPPORTED_MEDIA_TYPE;

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		List<String> errors = new ArrayList<String>();
		for (FieldError error : ex.getBindingResult().getFieldErrors()) {
			errors.add(error.getField() + ": " + error.getDefaultMessage());
		}
		for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
			errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
		}

		ErrorDetails errorDetails = new ErrorDetails(BAD_REQUEST.value(), ex.getLocalizedMessage(), errors);
		return handleExceptionInternal(ex, errorDetails, headers, BAD_REQUEST, request);
	}

	@Override
	protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		String error = ex.getParameterName() + " parameter is missing";

		ErrorDetails errorDetails = new ErrorDetails(BAD_REQUEST.value(), ex.getLocalizedMessage(), error);
		return new ResponseEntity<Object>(errorDetails, new HttpHeaders(), BAD_REQUEST);
	}

	@ExceptionHandler({ ConstraintViolationException.class })
	public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex, WebRequest request) {
		List<String> errors = new ArrayList<String>();

		for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
			errors.add(violation.getPropertyPath() + ": " + violation.getMessage());
		}

		ErrorDetails errorDetails = new ErrorDetails(BAD_REQUEST.value(), ex.getLocalizedMessage(), errors);
		return new ResponseEntity<Object>(errorDetails, new HttpHeaders(), BAD_REQUEST);
	}

	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		List<String> errors = new ArrayList<String>();
		errors.add(ex.getMessage());

		ErrorDetails errorDetails = new ErrorDetails(BAD_REQUEST.value(), ex.getLocalizedMessage(), errors);
		return new ResponseEntity<Object>(errorDetails, new HttpHeaders(), BAD_REQUEST);
	}

	@ExceptionHandler({ MethodArgumentTypeMismatchException.class })
	public ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex,
			WebRequest request) {
		String error = ex.getName() + " should be of type " + ex.getRequiredType().getName();
		ErrorDetails errorDetails = new ErrorDetails(BAD_REQUEST.value(), ex.getLocalizedMessage(), error);
		return new ResponseEntity<Object>(errorDetails, new HttpHeaders(), BAD_REQUEST);
	}

	@Override
	protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		String error = "No handler found for " + ex.getHttpMethod() + " " + ex.getRequestURL();

		ErrorDetails errorDetails = new ErrorDetails(NOT_FOUND.value(), ex.getLocalizedMessage(), error);
		return new ResponseEntity<Object>(errorDetails, new HttpHeaders(), NOT_FOUND);
	}

	@Override
	protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		StringBuilder builder = new StringBuilder();
		builder.append(ex.getMethod());
		builder.append(" method is not supported for this request. Supported methods are ");
		ex.getSupportedHttpMethods().forEach(t -> builder.append(t + " "));

		ErrorDetails errorDetails = new ErrorDetails(METHOD_NOT_ALLOWED.value(), ex.getLocalizedMessage(),
				builder.toString());
		return new ResponseEntity<Object>(errorDetails, new HttpHeaders(), METHOD_NOT_ALLOWED);
	}

	@Override
	protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		StringBuilder builder = new StringBuilder();
		builder.append(ex.getContentType());
		builder.append(" media type is not supported. Supported media types are ");
		ex.getSupportedMediaTypes().forEach(t -> builder.append(t + ", "));

		ErrorDetails errorDetails = new ErrorDetails(UNSUPPORTED_MEDIA_TYPE.value(), ex.getLocalizedMessage(),
				builder.substring(0, builder.length() - 2));
		return new ResponseEntity<Object>(errorDetails, new HttpHeaders(), UNSUPPORTED_MEDIA_TYPE);
	}

}
