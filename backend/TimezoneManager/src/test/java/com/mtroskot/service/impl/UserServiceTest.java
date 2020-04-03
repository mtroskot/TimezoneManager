package com.mtroskot.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import com.mtroskot.exception.AppException;
import com.mtroskot.model.entity.auth.Role;
import com.mtroskot.model.entity.auth.Role.RoleType;
import com.mtroskot.model.entity.auth.User;
import com.mtroskot.repository.UserRepository;
import com.mtroskot.service.RoleService;
import com.mtroskot.service.UserService;

@RunWith(SpringRunner.class)
public class UserServiceTest {

	private UserService userService;
	@MockBean
	private UserRepository userRepository;
	@MockBean
	private RoleService roleService;
	@MockBean
	private PasswordEncoder passwordEncoder;
	@SuppressWarnings("deprecation")
	@Rule
	public final ExpectedException thrown = ExpectedException.none();

	@Before
	public void setup() {
		userService = new UserServiceImpl(userRepository, roleService, passwordEncoder);
	}

	/* Find successful */
	@Test
	public void findAllTest() {
		User user1 = new User();
		User user2 = new User();
		List<User> userList = Arrays.asList(user1, user2);
		Mockito.when(userRepository.findAll()).thenReturn(userList);

		Iterable<User> findAll = userService.findAll();

		Assert.assertEquals("List is equal", findAll, userList);
	}

	/* Find successful */
	@Test
	public void findByIdTest() {
		User user1 = new User();
		Mockito.when(userRepository.findById(ArgumentMatchers.anyLong())).thenReturn(Optional.of(user1));

		Optional<User> findById = userService.findById(5L);

		Assert.assertEquals("Users are equal", user1, findById.get());
	}

	/* Saving successful,password not encoded */
	@Test
	public void saveTest1() {
		User user = new User();
		String password = "password";
		user.setPassword(password);
		Mockito.when(userRepository.save(ArgumentMatchers.any(User.class))).thenReturn(user);

		User savedUser = userService.save(user, false);

		Assert.assertEquals("Saved user is user", user, savedUser);
		Assert.assertEquals("Password is same as before", password, savedUser.getPassword());
	}

	/* Saving successful,password not encoded */
	@Test
	public void saveTest2() {
		User user = new User();
		String password = "password";
		user.setPassword(password);

		Mockito.when(userRepository.save(ArgumentMatchers.any(User.class))).thenReturn(user);
		String encodedPassword = "asdfaymyYxxQQfeq12edwq";
		Mockito.when(passwordEncoder.encode(ArgumentMatchers.anyString())).thenReturn(encodedPassword);

		User savedUser = userService.save(user, true);

		Assert.assertEquals("Saved user is user", user, savedUser);
		Assert.assertEquals("Password is encoded", encodedPassword, savedUser.getPassword());
	}

	@Test
	public void existsByEmailAddressIgnoreCaseTest() {
		Mockito.when(userRepository.existsByEmailAddressIgnoreCase(ArgumentMatchers.anyString())).thenReturn(true);

		Boolean exists = userService.existsByEmailAddressIgnoreCase("email");

		Assert.assertEquals("Email exists", true, exists);
	}

	@Test
	public void deleteTest() {

		userService.delete(5L);

		Mockito.verify(this.userRepository, Mockito.times(1)).deleteById(ArgumentMatchers.anyLong());

	}

	@Test
	public void findAllByFirstNameOrLastNameOrEmailAddressTest() {
		User user1 = new User();
		User user2 = new User();
		List<User> userList = Arrays.asList(user1, user2);
		Mockito.when(userRepository.findByLikeEmailAddressOrFirstNameOrLastName(ArgumentMatchers.anyString()))
				.thenReturn(userList);

		Iterable<User> list = userService.findAllByFirstNameOrLastNameOrEmailAddress("email");

		Assert.assertEquals("List are equal", userList, list);
	}

	/*
	 * should throw exception if USER role not found
	 */
	@Test
	public void changeUserRoleTest1() {
		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.USER))).thenReturn(Optional.ofNullable(null));
		thrown.expect(AppException.class);
		// you can test the exception message like
		thrown.expectMessage("User role not found");
		User user1 = new User();
		userService.changeUserRole(user1, RoleType.ADMIN);
	}

	/*
	 * should throw exception if MANAGER role not found
	 */
	@Test
	public void changeUserRoleTest2() {
		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.USER)))
				.thenReturn(Optional.of(new Role(RoleType.USER)));
		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.MANAGER)))
				.thenReturn(Optional.ofNullable(null));
		thrown.expect(AppException.class);
		// you can test the exception message like
		thrown.expectMessage("Manager role not found");
		User user1 = new User();
		userService.changeUserRole(user1, RoleType.ADMIN);
	}

	/*
	 * should throw exception if ADMIN role not found
	 */
	@Test
	public void changeUserRoleTest3() {
		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.USER)))
				.thenReturn(Optional.of(new Role(RoleType.USER)));
		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.MANAGER)))
				.thenReturn(Optional.of(new Role(RoleType.MANAGER)));
		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.ADMIN))).thenReturn(Optional.ofNullable(null));
		thrown.expect(AppException.class);
		// you can test the exception message like
		thrown.expectMessage("Admin role not found");
		User user1 = new User();
		userService.changeUserRole(user1, RoleType.ADMIN);
	}

	/*
	 * changing user role to ADMIN,when saving the user password shouldn't be
	 * encoded
	 */
	@Test
	public void changeUserRoleTest4() {
		User user1 = new User();

		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.USER)))
				.thenReturn(Optional.of(new Role(RoleType.USER)));
		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.MANAGER)))
				.thenReturn(Optional.of(new Role(RoleType.MANAGER)));
		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.ADMIN)))
				.thenReturn(Optional.of(new Role(RoleType.ADMIN)));

		Mockito.when(userRepository.save(ArgumentMatchers.any(User.class))).thenReturn(user1);

		User updatedUser = userService.changeUserRole(user1, RoleType.ADMIN);

		Mockito.verify(this.passwordEncoder, Mockito.times(0)).encode(ArgumentMatchers.anyString());
		Assert.assertEquals("Should be equal", user1, updatedUser);
		Assert.assertEquals("Should have 3 roles", 3, updatedUser.getRoles().size());
		Assert.assertEquals("Should have ADMIN role", true, updatedUser.getRoles().contains(new Role(RoleType.ADMIN)));
		Assert.assertEquals("Should have MANAGER role", true,
				updatedUser.getRoles().contains(new Role(RoleType.MANAGER)));
		Assert.assertEquals("Should have USER role", true, updatedUser.getRoles().contains(new Role(RoleType.USER)));

	}

	/*
	 * changing user role to USER,previous roles should be cleared
	 */
	@Test
	public void changeUserRoleTest5() {
		User user1 = new User();
		user1.getRoles()
				.addAll(Arrays.asList(new Role(RoleType.USER), new Role(RoleType.MANAGER), new Role(RoleType.ADMIN)));

		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.USER)))
				.thenReturn(Optional.of(new Role(RoleType.USER)));
		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.MANAGER)))
				.thenReturn(Optional.of(new Role(RoleType.MANAGER)));
		Mockito.when(roleService.findByType(ArgumentMatchers.eq(RoleType.ADMIN)))
				.thenReturn(Optional.of(new Role(RoleType.ADMIN)));

		Mockito.when(userRepository.save(ArgumentMatchers.any(User.class))).thenReturn(user1);

		User updatedUser = userService.changeUserRole(user1, RoleType.USER);

		Mockito.verify(this.passwordEncoder, Mockito.times(0)).encode(ArgumentMatchers.anyString());
		Assert.assertEquals("Should be equal", user1, updatedUser);
		Assert.assertEquals("Should have 1 roles", 1, updatedUser.getRoles().size());
		Assert.assertEquals("Should have ADMIN role", false, updatedUser.getRoles().contains(new Role(RoleType.ADMIN)));
		Assert.assertEquals("Should have MANAGER role", false,
				updatedUser.getRoles().contains(new Role(RoleType.MANAGER)));
		Assert.assertEquals("Should have USER role", true, updatedUser.getRoles().contains(new Role(RoleType.USER)));

	}
}
