package com.mtroskot.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	/**
	 * This method is called whenever an exception is thrown due to an
	 * unauthenticated user trying to access a resource that requires
	 * authentication.
	 */
	@Override
	public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			AuthenticationException e) throws IOException, ServletException {
		final String expiredMsg = (String) httpServletRequest.getAttribute("expired");
		final String msg = (expiredMsg != null) ? expiredMsg : "Unauthorized";
		log.error("Responding with unauthorized error. Message - {}", msg);
		httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, msg);
	}
}