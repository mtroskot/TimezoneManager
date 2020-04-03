package com.mtroskot.controller;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.mtroskot.exception.AppException;
import com.mtroskot.model.entity.auth.RefreshToken;
import com.mtroskot.model.entity.auth.Role;
import com.mtroskot.model.entity.auth.Role.RoleType;
import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.request.LoginRequest;
import com.mtroskot.model.request.LogoutRequest;
import com.mtroskot.model.request.RefreshJwtTokenRequest;
import com.mtroskot.model.request.RegisterRequest;
import com.mtroskot.model.response.JwtAuthenticationResponse;
import com.mtroskot.security.JwtTokenProvider;
import com.mtroskot.security.RefreshTokenProvider;
import com.mtroskot.service.RefreshTokenService;
import com.mtroskot.service.RoleService;
import com.mtroskot.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(path = "/auth", produces = "application/json")
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final UserService userService;
	private final RoleService roleService;
	private final JwtTokenProvider tokenProvider;
	private final RefreshTokenProvider refreshTokenProvider;
	private final RefreshTokenService refreshTokenService;

	/**
	 * Authenticates user by given {@code loginRequest} which contains user
	 * credentials.
	 * 
	 * @param loginRequest The object containing user credentials needed for user
	 *                     authentication.
	 * @return ResponseEntity<JwtAuthenticationResponse>
	 */
	@PostMapping(path = "/login", consumes = "application/json")
	public ResponseEntity<JwtAuthenticationResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginRequest.getEmailAddress().toLowerCase(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenProvider.generateToken((User) authentication.getPrincipal());
		User user = (User) authentication.getPrincipal();

		RefreshToken refreshToken = refreshTokenProvider.generateToken(user);
		refreshTokenService.save(refreshToken);

		return new ResponseEntity<JwtAuthenticationResponse>(new JwtAuthenticationResponse(jwt, refreshToken, user),
				HttpStatus.OK);
	}

	/**
	 * Logs out user by deleting his refresh token in database.
	 * 
	 * @param logoutRequest The request which holds user refresh token
	 * @param user          The user being singed out
	 * @return ResponseEntity<String>
	 */
	@PreAuthorize("hasAuthority('USER')")
	@PostMapping(path = "/logout", consumes = "application/json")
	public ResponseEntity<String> logoutUser(@Valid @RequestBody LogoutRequest logoutRequest,
			@AuthenticationPrincipal User user) {
		Optional<RefreshToken> validRefreshTokenByUserId = refreshTokenService
				.getValidRefreshTokenByUserId(logoutRequest.getRefreshToken(), user.getId());
		if (validRefreshTokenByUserId.isPresent()) {
			RefreshToken refreshToken = validRefreshTokenByUserId.get();
			refreshToken.setInvalidated(true);
			refreshTokenService.save(refreshToken);
		}
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	/**
	 * Registers user by given {@code signUpRequest} which contains registration
	 * details need for registration.
	 * 
	 * @param signUpRequest The object containing registration details.
	 * @return ResponseEntity<User>
	 */
	@PostMapping(path = "/register", consumes = "application/json")
	public ResponseEntity<User> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
		if (userService.existsByEmailAddressIgnoreCase(registerRequest.getEmailAddress())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Email Address already in use!");
		}
		if (!registerRequest.getPassword().equals(registerRequest.getMatchingPassword())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Passwords don't match");
		}

		// Creating user's account
		Role userRole = roleService.findByType(RoleType.USER)
				.orElseThrow(() -> new AppException("User Role not found."));
		Set<Role> roleSet = Collections.singleton(userRole);
		User user = registerRequest.toUser(roleSet);
		boolean encodePassword = true;
		return new ResponseEntity<User>(userService.save(user, encodePassword), HttpStatus.CREATED);
	}

	/**
	 * Returns a new refresh and access token for user.
	 * 
	 * @param refreshJwtTokenRequest The request which holds old access and refresh
	 *                               token
	 * @param userId                 The id of user which has requested new access
	 *                               and refresh token
	 * @return ResponseEntity<JwtAuthenticationResponse>
	 */
	@PostMapping(path = "/refresh", consumes = "application/json")
	public ResponseEntity<JwtAuthenticationResponse> refreshJwtToken(
			@Valid @RequestBody RefreshJwtTokenRequest refreshJwtTokenRequest, @RequestParam("userId") Long userId) {
		Optional<RefreshToken> validRefreshTokenByUserId = refreshTokenService
				.getValidRefreshTokenByUserId(refreshJwtTokenRequest.getRefreshToken(), userId);
		if (validRefreshTokenByUserId.isPresent()) {
			User user = userService.findById(userId)
					.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
			RefreshToken refreshToken = validRefreshTokenByUserId.get();
			// check if expired
			if (refreshTokenProvider.isExpired(refreshToken)) {
				log.info("Refresh token expired");
				// if expired but still valid create a new one, else return UNAUTHORIZED
				if (refreshToken.isInvalidated()) {
					return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
				}
				refreshToken.setInvalidated(true);
				// invalidate old one
				refreshTokenService.save(refreshToken);
				refreshToken = refreshTokenProvider.generateToken(user);
				// save new one
				refreshTokenService.save(refreshToken);
			}

			String jwt = tokenProvider.generateToken(user);
			return new ResponseEntity<JwtAuthenticationResponse>(new JwtAuthenticationResponse(jwt, refreshToken, user),
					HttpStatus.OK);
		} else {
			log.info("No valid refresh token present for userId " + userId + " and refresh token "
					+ refreshJwtTokenRequest.getRefreshToken());
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}

}