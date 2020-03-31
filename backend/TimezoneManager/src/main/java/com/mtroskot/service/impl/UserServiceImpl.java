package com.mtroskot.service.impl;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mtroskot.exception.AppException;
import com.mtroskot.model.entity.auth.Role;
import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.auth.Role.RoleType;
import com.mtroskot.repository.UserRepository;
import com.mtroskot.service.RoleService;
import com.mtroskot.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final RoleService roleService;
	private final PasswordEncoder passwordEncoder;

	@Override
	public Iterable<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public Optional<User> findById(Long userId) {
		return userRepository.findById(userId);
	}

	@Override
	public Optional<User> findByEmailAddress(String emailAddress) {
		return userRepository.findByEmailAddress(emailAddress);
	}

	@Override
	public User save(User user, boolean encodePassword) {
		if (encodePassword) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		return userRepository.save(user);
	}

	@Override
	public Boolean existsByEmailAddressIgnoreCase(String emailAddress) {
		return userRepository.existsByEmailAddressIgnoreCase(emailAddress);
	}

	@Override
	public void delete(Long userId) {
		userRepository.deleteById(userId);
	}

	@Override
	public Iterable<User> findAllByFirstNameOrLastNameOrEmailAddress(String input) {
		return userRepository.findByLikeEmailAddressOrFirstNameOrLastName(input);
	}

	@Override
	public User changeUserRole(User user, RoleType roleType) {
		Set<Role> roles = null;
		Role roleUser = roleService.findByType(RoleType.USER)
				.orElseThrow(() -> new AppException("User role not found"));
		Role roleManager = roleService.findByType(RoleType.MANAGER)
				.orElseThrow(() -> new AppException("Manager role not found"));
		Role roleAdmin = roleService.findByType(RoleType.ADMIN)
				.orElseThrow(() -> new AppException("Admin role not found"));
		switch (roleType) {
		case ADMIN:
			roles = new HashSet<Role>(Arrays.asList(roleUser, roleManager, roleAdmin));
			break;
		case MANAGER:
			roles = new HashSet<Role>(Arrays.asList(roleUser, roleManager));
			break;
		default:
			roles = new HashSet<Role>(Arrays.asList(roleUser));
			break;
		}
		user.getRoles().clear();
		user.getRoles().addAll(roles);

		boolean encodePassword = false;
		return save(user, encodePassword);
	}

}
