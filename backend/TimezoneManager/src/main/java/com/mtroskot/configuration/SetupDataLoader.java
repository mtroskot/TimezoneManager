package com.mtroskot.configuration;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.mtroskot.exception.AppException;
import com.mtroskot.model.entity.auth.Role;
import com.mtroskot.model.entity.auth.Role.RoleType;
import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;
import com.mtroskot.service.RoleService;
import com.mtroskot.service.TimezoneEntryService;
import com.mtroskot.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
@Profile("!prod")
public class SetupDataLoader {

	/**
	 * Populates database with test data.
	 * 
	 * @param roleService
	 * @param userService
	 */
	@Bean
	public CommandLineRunner dataLoader(RoleService roleService, UserService userService,
			TimezoneEntryService timezoneEntryService) {
		return new CommandLineRunner() {
			@Override
			public void run(String... args) throws Exception {
				log.info("Starting dataLoader");
				/* creating user */
				Role roleUser = new Role(RoleType.USER);
				Role roleManager = new Role(RoleType.MANAGER);
				Role roleAdmin = new Role(RoleType.ADMIN);
				roleService.save(roleUser);
				roleService.save(roleManager);
				roleService.save(roleAdmin);

				boolean encodePassword = true;
				Role userRole = roleService.findByType(RoleType.USER)
						.orElseThrow(() -> new AppException("User Role not found"));
				Set<Role> userRoleSet = Collections.singleton(userRole);
				Role managerRole = roleService.findByType(RoleType.MANAGER)
						.orElseThrow(() -> new AppException("User Role not found"));
				Set<Role> managerRoleSet = new HashSet<Role>(Arrays.asList(userRole, managerRole));
				Role adminRole = roleService.findByType(RoleType.ADMIN)
						.orElseThrow(() -> new AppException("User Role not found"));
				Set<Role> adminRoleSet = new HashSet<Role>(Arrays.asList(userRole, managerRole, adminRole));

				User user1 = new User("EB", "emily@hotmail.com", "Emily", "Bertovic", "password");
				user1.getRoles().addAll(userRoleSet);
				userService.save(user1, encodePassword);

				User user2 = new User("DT", "drazen@hotmail.com", "Drazen", "Tralic", "password");
				user2.getRoles().addAll(managerRoleSet);
				userService.save(user2, encodePassword);

				User user3 = new User("marko@hotmail.com", "Marko", "Troskot", "password");
				user3.getRoles().addAll(adminRoleSet);
				userService.save(user3, encodePassword);

				TimezoneEntry timezoneEntry = new TimezoneEntry("US", "New York", "+6", user1);
				timezoneEntryService.save(timezoneEntry);

				TimezoneEntry timezoneEntry2 = new TimezoneEntry("US", "New Orleans", "+5", user3);
				timezoneEntryService.save(timezoneEntry2);
				TimezoneEntry timezoneEntry3 = new TimezoneEntry("HR", "Zadar", "+2", user3);
				timezoneEntryService.save(timezoneEntry3);
				TimezoneEntry timezoneEntry4 = new TimezoneEntry("DE", "Berlin", "+1", user3);
				timezoneEntryService.save(timezoneEntry4);

			}
		};
	}

}
