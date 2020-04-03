package com.mtroskot.repository;

import java.util.Arrays;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.mtroskot.model.entity.auth.User;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase
@ActiveProfiles("test")
public class UserRepositoryTest {
	@Autowired
	private UserRepository userRepository;

	User user1 = new User("marko@hotmail.com", "Marko", "Troskot", "password");
	User user2 = new User("drazen@mail.com", "Drazen", "Tralic", "password");
	User user3 = new User("luka@rccl.com", "Luka", "Peric", "password");
	User user4 = new User("mate@live.com", "Mate", "Anic", "password");
	User user5 = new User("emily@gmail.com", "Emily", "James", "password");

	@Before
	public void init() {
		userRepository.save(user1);
		userRepository.save(user2);
		userRepository.save(user3);
		userRepository.save(user4);
		userRepository.save(user5);
	}

	@Test
	public void findByLikeEmailAddressOrFirstNameOrLastNameTest1() {
		List<User> userList = (List<User>) userRepository.findByLikeEmailAddressOrFirstNameOrLastName("ma");

		Assert.assertEquals("List is not empty", true, !userList.isEmpty());
		Assert.assertEquals("List size is 4", 4, userList.size());
		Assert.assertEquals("List content", Arrays.asList(user1, user2, user4, user5), userList);
	}

	@Test
	public void findByLikeEmailAddressOrFirstNameOrLastNameTest2() {
		List<User> userList = (List<User>) userRepository.findByLikeEmailAddressOrFirstNameOrLastName("Marko");

		Assert.assertEquals("List is not empty", true, !userList.isEmpty());
		Assert.assertEquals("List size is 1", 1, userList.size());
		Assert.assertEquals("List content", Arrays.asList(user1), userList);
	}

	@Test
	public void findByLikeEmailAddressOrFirstNameOrLastNameTest3() {
		List<User> userList = (List<User>) userRepository.findByLikeEmailAddressOrFirstNameOrLastName("Tralic");

		Assert.assertEquals("List is not empty", true, !userList.isEmpty());
		Assert.assertEquals("List size is 1", 1, userList.size());
		Assert.assertEquals("List content", Arrays.asList(user2), userList);
	}

	@Test
	public void findByLikeEmailAddressOrFirstNameOrLastNameTest4() {
		List<User> userList = (List<User>) userRepository.findByLikeEmailAddressOrFirstNameOrLastName("rccl");

		Assert.assertEquals("List is not empty", true, !userList.isEmpty());
		Assert.assertEquals("List size is 1", 1, userList.size());
		Assert.assertEquals("List content", Arrays.asList(user3), userList);
	}

	@Test
	public void findByLikeEmailAddressOrFirstNameOrLastNameTest5() {
		List<User> userList = (List<User>) userRepository.findByLikeEmailAddressOrFirstNameOrLastName("FooBar");

		Assert.assertEquals("List is empty", true, userList.isEmpty());
	}

}
