package com.mtroskot.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mtroskot.model.entity.auth.Role;
import com.mtroskot.model.entity.auth.Role.RoleType;
import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.request.UpdateUserInfoRequest;
import com.mtroskot.security.JwtAuthenticationEntryPoint;
import com.mtroskot.security.JwtTokenProvider;
import com.mtroskot.service.UserService;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = UserController.class)
public class UserControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;
	@MockBean
	private UserService userService;

	@MockBean
	private AuthenticationManager authenticationManager;
	@MockBean
	private PasswordEncoder passwordEncoder;
	@MockBean
	private JwtTokenProvider tokenProvider;
	@MockBean
	private UserDetailsService userDetailsService;
	@MockBean
	private JwtAuthenticationEntryPoint unauthorizedHandler;

	// FIND ALL USERS
	/* user hasn't required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = "USER")
	public void findAllUsersTest1() throws Exception {
		mockMvc.perform(get("/users/all").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(403));
	}

	/* user has required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "USER", "MANAGER" })
	public void findAllUsersTest2() throws Exception {
		User user1 = new User("user1@user.com", "User1", "User1", "password");
		User user2 = new User("user2@user.com", "User2", "User2", "password");
		List<User> userList = Arrays.asList(user1, user2);

		Mockito.when(userService.findAll()).thenReturn(userList);

		mockMvc.perform(get("/users/all").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(200))
				.andExpect(content().json(objectMapper.writeValueAsString(userList)));
	}

	/* user has required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void findAllUsersTest3() throws Exception {
		User user1 = new User("user1@user.com", "User1", "User1", "password");
		User user2 = new User("user2@user.com", "User2", "User2", "password");
		List<User> userList = Arrays.asList(user1, user2);

		Mockito.when(userService.findAll()).thenReturn(userList);

		mockMvc.perform(get("/users/all").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(200))
				.andExpect(content().json(objectMapper.writeValueAsString(userList)));
	}

	// FILTER ALL USERS
	/* user hasn't required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = "USER")
	public void filterUsersTest1() throws Exception {
		mockMvc.perform(get("/users/filter?input=abc").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(403));
	}

	/* user has required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "USER", "MANAGER" })
	public void filterUsers2() throws Exception {
		User user1 = new User("user1@user.com", "User1", "User1", "password");
		User user2 = new User("user2@user.com", "User2", "User2", "password");
		List<User> userList = Arrays.asList(user1, user2);

		Mockito.when(userService.findAllByFirstNameOrLastNameOrEmailAddress(ArgumentMatchers.anyString()))
				.thenReturn(userList);

		mockMvc.perform(get("/users/filter?input=abc").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(200)).andExpect(content().json(objectMapper.writeValueAsString(userList)));
	}

	/* user has required authorities, BAD_REQUEST */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void filterUsersTest3() throws Exception {

		mockMvc.perform(get("/users/filter").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(400));
	}

	// UPDATE USER
	/* user hasn't required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = "USER")
	public void updateUser1() throws Exception {
		mockMvc.perform(put("/users").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(403));
	}

	/* user has required authorities,valid request */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "USER", "MANAGER" })
	public void updateUserTest2() throws Exception {
		User user1 = new User("user1@user.com", "User1", "User1", "password");
		UpdateUserInfoRequest updateUserInfoRequest = new UpdateUserInfoRequest(1L, "Marko", "Troskot",
				"marko@hotmail.com");
		Mockito.when(userService.findById(ArgumentMatchers.anyLong())).thenReturn(Optional.of(user1));

		User updatedUser = new User("user1@user.com", "User1", "User1", "password");
		Mockito.when(userService.save(ArgumentMatchers.any(User.class), ArgumentMatchers.anyBoolean()))
				.thenReturn(updatedUser);

		mockMvc.perform(put("/users").content(objectMapper.writeValueAsString(updateUserInfoRequest))
				.contentType("application/json").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(200))
				.andExpect(content().json(objectMapper.writeValueAsString(updatedUser)));
	}

	/* user has required authorities, UNSUPPORTED MEDIA TYPE */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void updateUserTest3() throws Exception {

		mockMvc.perform(put("/users").contentType("application/xml").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(415));
	}

	/* user has required authorities, BAD_REQUEST */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void updateUserTest4() throws Exception {
		UpdateUserInfoRequest updateUserInfoRequest = new UpdateUserInfoRequest(null, "Marko", "Troskot", null);

		mockMvc.perform(put("/users").contentType("application/json")
				.content(objectMapper.writeValueAsString(updateUserInfoRequest)).characterEncoding("UTF-8"))
				.andDo(print()).andExpect(status().is(400));
	}

	// DELETE USER
	/* user hasn't required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = "USER")
	public void deleteUserTest1() throws Exception {
		mockMvc.perform(delete("/users?userId=5").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(403));
	}

	/* user has required authorities,valid request */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "USER", "MANAGER" })
	public void deleteUserTest2() throws Exception {
		User user1 = new User("user1@user.com", "User1", "User1", "password");
		Mockito.when(userService.findById(ArgumentMatchers.anyLong())).thenReturn(Optional.of(user1));

		mockMvc.perform(delete("/users?userId=5").contentType("application/json").characterEncoding("UTF-8"))
				.andDo(print()).andExpect(status().is(200));
	}

	/* user has required authorities,user not found */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void deleteUserTest3() throws Exception {
		Mockito.when(userService.findById(ArgumentMatchers.anyLong())).thenReturn(Optional.ofNullable(null));

		mockMvc.perform(delete("/users?userId=5").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(404));
	}

	/* user has required authorities, BAD_REQUEST */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void deleteUserTest4() throws Exception {

		mockMvc.perform(delete("/users?userId=a").contentType("application/json").characterEncoding("UTF-8"))
				.andDo(print()).andExpect(status().is(400));
	}

	// CHANGE USER ROLE
	/* user has required authorities,valid request */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = "USER")
	public void changeUserRoleTest1() throws Exception {
		User user1 = new User("user1@user.com", "User1", "User1", "password");
		Mockito.when(userService.findById(ArgumentMatchers.anyLong())).thenReturn(Optional.of(user1));

		User updatedUser = new User("user1@user.com", "User1", "User1", "password");
		updatedUser.getRoles().addAll(Arrays.asList(new Role(RoleType.MANAGER), new Role(RoleType.ADMIN)));
		Mockito.when(userService.changeUserRole(ArgumentMatchers.any(User.class), ArgumentMatchers.any(RoleType.class)))
				.thenReturn(updatedUser);

		mockMvc.perform(put("/users/changeRole?userId=5&role=ADMIN").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(200))
				.andExpect(content().json(objectMapper.writeValueAsString(updatedUser.getRoles())));
	}

	
	/* user has required authorities,user not found */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void changeUserRoleTest2() throws Exception {
		Mockito.when(userService.findById(ArgumentMatchers.anyLong())).thenReturn(Optional.ofNullable(null));

		mockMvc.perform(put("/users/changeRole?userId=5&role=ADMIN").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(404));
	}

	/* user has required authorities, BAD_REQUEST */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void changeUserRoleTest3() throws Exception {

		mockMvc.perform(put("/users/changeRole?userId=5&role=NOT_EXISTING_ROLE").contentType("application/json")
				.characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(400));
	}
}
