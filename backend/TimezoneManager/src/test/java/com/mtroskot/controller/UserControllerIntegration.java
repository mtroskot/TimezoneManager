package com.mtroskot.controller;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mtroskot.model.entity.auth.Role;
import com.mtroskot.model.entity.auth.Role.RoleType;
import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.request.UpdateUserInfoRequest;
import com.mtroskot.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class UserControllerIntegration {
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private UserService userService;

	// FIND ALL USERS
	/* anonymous user */
	@Test
	@WithAnonymousUser
	public void findAllUsersTest() throws Exception {

		mockMvc.perform(get("/users").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(401));
	}

	/* user hasn't required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = "USER")
	public void findAllUsersTest1() throws Exception {

		mockMvc.perform(get("/users").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(403));
	}

	/* user has required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "USER", "MANAGER" })
	public void findAllUsersTest2() throws Exception {
		List<User> userList = (List<User>) userService.findAll();
		assertEquals("List size is 3", 3, userList.size());

		mockMvc.perform(get("/users").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(200))
				.andExpect(content().json(objectMapper.writeValueAsString(userList)));

		List<User> userListAfter = (List<User>) userService.findAll();
		assertEquals("List size is 3", 3, userListAfter.size());
	}

	/* user has required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void findAllUsersTest3() throws Exception {
		List<User> userList = (List<User>) userService.findAll();

		mockMvc.perform(get("/users").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(200))
				.andExpect(content().json(objectMapper.writeValueAsString(userList)));
	}

	// FILTER USERS
	/* anonymous user */
	@Test
	@WithAnonymousUser
	public void filterUsersTest() throws Exception {

		mockMvc.perform(get("/users/search?firstName=abc").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(401));
	}

	/* user hasn't required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = "USER")
	public void filterUsersTest1() throws Exception {

		mockMvc.perform(get("/users/search?firstName=abc").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(403));
	}

	/* user has required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "USER", "MANAGER" })
	public void filterUsersTest2() throws Exception {
		String firstName = "drazen";
		List<User> userList = (List<User>) userService.filterUsers(null, firstName, null);
		assertEquals("List size is 1", 1, userList.size());
		assertEquals("List contains user", true,
				userList.contains(userService.findByEmailAddress("drazen@hotmail.com").get()));

		mockMvc.perform(get("/users/search?firstName=" + firstName).characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(200)).andExpect(content().json(objectMapper.writeValueAsString(userList)));

		List<User> userListAfter = (List<User>) userService.filterUsers(null, firstName, null);
		assertEquals("List size is 1", 1, userListAfter.size());
		assertEquals("List contains user", true,
				userListAfter.contains(userService.findByEmailAddress("drazen@hotmail.com").get()));
	}

	/* user has required authorities, no filters */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void filterUsersTest3() throws Exception {

		mockMvc.perform(get("/users/search").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(200));
	}

	// UPDATE USER
	/* anonymous user */
	@Test
	@WithAnonymousUser
	public void updateUser() throws Exception {

		mockMvc.perform(put("/users").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(401));
	}

	/* user hasn't required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = "USER")
	public void updateUserTest1() throws Exception {

		mockMvc.perform(put("/users").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(403));
	}

	/* user has required authorities,valid request */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "USER", "MANAGER" })
	public void updateUserTest2() throws Exception {
		Long userId = 6L;
		UpdateUserInfoRequest updateUserInfoRequest = new UpdateUserInfoRequest(userId, "Markoo", "Troskott",
				"marko@hotmai.com");

		User userBeforeUpdate = userService.findById(6L).get();
		assertEquals("User first name before update", "Marko", userBeforeUpdate.getFirstName());
		assertEquals("User last name before update", "Troskot", userBeforeUpdate.getLastName());
		assertEquals("User email before update", "marko@hotmail.com", userBeforeUpdate.getEmailAddress());

		mockMvc.perform(put("/users").content(objectMapper.writeValueAsString(updateUserInfoRequest))
				.contentType("application/json").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(200))
				.andExpect(content().json(objectMapper.writeValueAsString(userService.findById(6L).get())));

		User userAfterUpdate = userService.findById(6L).get();
		assertEquals("User first name after update", "Markoo", userAfterUpdate.getFirstName());
		assertEquals("User last name after update", "Troskott", userAfterUpdate.getLastName());
		assertEquals("User email after update", "marko@hotmai.com", userAfterUpdate.getEmailAddress());
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
	/* anonymous user */
	@Test
	@WithAnonymousUser
	public void deleteUserTest() throws Exception {
		mockMvc.perform(delete("/users/5").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(401));
	}

	/* user hasn't required authorities */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = "USER")
	public void deleteUserTest1() throws Exception {
		mockMvc.perform(delete("/users/5").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(403));
	}

	/* user has required authorities,valid request */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "USER", "MANAGER" })
	public void deleteUserTest2() throws Exception {
		Optional<User> beforeDelete = userService.findByEmailAddress("marko@hotmail.com");
		assertEquals("User before delete is present", beforeDelete.isPresent(), true);

		Long userIdForDelete = beforeDelete.get().getId();
		mockMvc.perform(delete("/users/" + userIdForDelete).contentType("application/json").characterEncoding("UTF-8"))
				.andDo(print()).andExpect(status().is(200));

		Optional<User> afterDelete = userService.findByEmailAddress("marko@hotmail.com");
		assertEquals("User after delete is not present", afterDelete.isPresent(), false);

	}

	/* user has required authorities,user not found */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void deleteUserTest3() throws Exception {

		mockMvc.perform(delete("/users/50").characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(404));
	}

	/* user has required authorities, BAD_REQUEST */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void deleteUserTest4() throws Exception {

		mockMvc.perform(delete("/users/a").contentType("application/json").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(400));
	}

	// CHANGE USER ROLE
	/* anonymous user */
	@Test
	@WithAnonymousUser
	public void changeUserRoleTest() throws Exception {

		mockMvc.perform(put("/users/5/changeRole?role=ADMIN").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(401));
	}

	/* user has required authorities,valid request */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "USER", "MANAGER" })
	public void changeUserRoleTest1() throws Exception {
		User userBeforeUpdate = userService.findByEmailAddress("marko@hotmail.com").get();
		assertEquals("Before role change user has 3 roles", 3, userBeforeUpdate.getRoles().size());
		assertEquals("Before role change user has USER,MANAGER,ADMIN role", true,
				userBeforeUpdate.getRoles().containsAll(
						Arrays.asList(new Role(RoleType.USER), new Role(RoleType.MANAGER), new Role(RoleType.ADMIN))));

		mockMvc.perform(put("/users/" + userBeforeUpdate.getId() + "/changeRole?role=USER").characterEncoding("UTF-8"))
				.andDo(print()).andExpect(status().is(200)).andExpect(content().json(objectMapper.writeValueAsString(
						userService.findByEmailAddress(userBeforeUpdate.getEmailAddress()).get().getRoles())));

		User userAfterUpdate = userService.findByEmailAddress("marko@hotmail.com").get();
		assertEquals("After role change user has 1 role", 1, userAfterUpdate.getRoles().size());
		assertEquals("After role change user has only USER role", true,
				userAfterUpdate.getRoles().contains(new Role(RoleType.USER)));
	}

	/* user has required authorities,User not found */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "USER", "MANAGER" })
	public void changeUserRoleTest2() throws Exception {

		mockMvc.perform(put("/users/50/changeRole?role=ADMIN").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(404));
	}

	/* user has required authorities,user not found */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void changeUserRoleTest3() throws Exception {

		mockMvc.perform(put("/users/50/changeRole?role=ADMIN").characterEncoding("UTF-8")).andDo(print())
				.andExpect(status().is(404));
	}

	/* user has required authorities, BAD_REQUEST */
	@Test
	@WithMockUser(username = "testuser", password = "testpass", authorities = { "MANAGER", "ADMIN" })
	public void changeUserRoleTest4() throws Exception {

		mockMvc.perform(put("/users/5/changeRole?role=NOT_EXISTING_ROLE").contentType("application/json")
				.characterEncoding("UTF-8")).andDo(print()).andExpect(status().is(400));
	}
}
