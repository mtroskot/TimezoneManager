package com.mtroskot.repository;

import java.util.Optional;

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
	public void existsByEmailAddressIgnoreCaseTest1() {
		Boolean exists = userRepository.existsByEmailAddressIgnoreCase("marko@hotmail.com");

		Assert.assertEquals("email address exists", true, exists);
	}

	@Test
	public void existsByEmailAddressIgnoreCaseTest2() {
		Boolean exists = userRepository.existsByEmailAddressIgnoreCase("marko@gmail.com");

		Assert.assertEquals("email address exists not", false, exists);
	}

	@Test
	public void findByEmailAddressTest1() {
		Optional<User> user = userRepository.findByEmailAddress("drazen@mail.com");

		Assert.assertEquals("User found", true, user.isPresent());
		Assert.assertEquals("User is", user2, user.get());
	}

	@Test
	public void findByEmailAddressTest2() {
		Optional<User> user = userRepository.findByEmailAddress("drazen@hotmail.com");

		Assert.assertEquals("User not found", true, user.isEmpty());
	}

}
