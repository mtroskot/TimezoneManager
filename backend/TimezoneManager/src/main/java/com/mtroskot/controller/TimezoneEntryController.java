package com.mtroskot.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.mtroskot.model.entity.auth.Role;
import com.mtroskot.model.entity.auth.Role.RoleType;
import com.mtroskot.model.entity.auth.User;
import com.mtroskot.model.entity.timezone.TimezoneEntry;
import com.mtroskot.service.TimezoneEntryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "timezoneEntries", produces = "application/json")
@Slf4j
@Validated
public class TimezoneEntryController {
	private final TimezoneEntryService timezoneEntryService;

	/**
	 * Returns all {@link TimezoneEntry} from database.
	 * 
	 * @return Iterable<TimezoneEntry>
	 */
	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/all")
	public Iterable<TimezoneEntry> findAllTimezoneEntris() {
		return timezoneEntryService.findAll();
	}

	/**
	 * Filters all {@link TimezoneEntry} by entry name or entry cityName
	 * 
	 * @param name The name used for filtering entries
	 * @return Iterable<TimezoneEntry>
	 */
	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/filter")
	public Iterable<TimezoneEntry> filterAllByName(@RequestParam("name") @NotBlank String name) {
		return timezoneEntryService.findAllByNameOrCityName(name);
	}

	/**
	 * Returns all {@link TimezoneEntry} from database for given user.
	 * 
	 * @param user The user whose entries we want to retrieve.
	 * @return Iterable<TimezoneEntry>
	 */
	@GetMapping("/user")
	public Iterable<TimezoneEntry> findTimezoneEntriesFromUser(@AuthenticationPrincipal User user) {
		return timezoneEntryService.findAllByUser(user);
	}

	/**
	 * Filters all {@link TimezoneEntry} from given user by entry name or entry
	 * cityName
	 * 
	 * @param name The name used for filtering entries
	 * @param user The user whose entries we are filtering
	 * @return Iterable<TimezoneEntry>
	 */
	@GetMapping("/user/filter")
	public Iterable<TimezoneEntry> filterUserEntriesByName(@RequestParam("name") @NotBlank String name,
			@AuthenticationPrincipal User user) {
		return timezoneEntryService.findAllByUserAndNameOrCityName(user.getId(), name);
	}

	/**
	 * Saves {@link TimezoneEntry} to database.
	 * 
	 * @param timezoneEntry The {@link TimezoneEntry} to be saved
	 * @param user          The user which has the entry
	 * @return ResponseEntity<TimezoneEntry> The saved entry
	 */
	@PostMapping(consumes = "application/json")
	public ResponseEntity<TimezoneEntry> saveTimezoneEntry(@Valid @RequestBody TimezoneEntry timezoneEntry,
			@AuthenticationPrincipal User user) {
		try {
			timezoneEntry.setUser(user);
			TimezoneEntry savedEntry = timezoneEntryService.save(timezoneEntry);
			return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
		} catch (NumberFormatException e) {
			log.error(e.getMessage());
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	/**
	 * Updates {@link TimezoneEntry} in database. Update is carried out only if the
	 * user has sufficient permissions or is owner of the entry.
	 * 
	 * @param updatedTimezoneEntry The {@link TimezoneEntry} being updated
	 * @param user                 The user which requested entry update
	 * @return ResponseEntity<TimezoneEntry> The updated entry
	 */
	@PutMapping(path = "", consumes = "application/json")
	public ResponseEntity<TimezoneEntry> updateTimezoneEntry(@Valid @RequestBody TimezoneEntry updatedTimezoneEntry,
			@AuthenticationPrincipal User user) {
		try {
			TimezoneEntry timezoneEntryForUpdate = timezoneEntryService.findById(updatedTimezoneEntry.getId())
					.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "TimezoneEntry not found"));
			// check if entry from user && if not check if user has right to alter entry
			if (checkIfUserHasPermissionsToCompleteOperation(timezoneEntryForUpdate, user)) {
				timezoneEntryForUpdate.setName(updatedTimezoneEntry.getName());
				timezoneEntryForUpdate.setCityName(updatedTimezoneEntry.getCityName());
				timezoneEntryForUpdate.setDifferenceToGMT(updatedTimezoneEntry.getDifferenceToGMT());
				TimezoneEntry saveEntry = timezoneEntryService.save(timezoneEntryForUpdate);
				return new ResponseEntity<>(saveEntry, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (NumberFormatException e) {
			log.error(e.getMessage());
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	/***
	 * Deletes {@link TimezoneEntry} from database. Delete is carried out only if
	 * the user has sufficient permissions or is owner of the entry.
	 * 
	 * @param timezoneEntryId he {@link TimezoneEntry} being deleted
	 * @param user            The user which requested entry delete
	 * @return ResponseEntity<String>
	 */
	@DeleteMapping()
	public ResponseEntity<String> deleteTimezoneEntry(@RequestParam("timezoneEntryId") @Positive Long timezoneEntryId,
			@AuthenticationPrincipal User user) {
		try {
			TimezoneEntry timezoneEntry = timezoneEntryService.findById(timezoneEntryId)
					.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "TimezoneEntry not found"));
			// check if entry from user && if not check if user has right to alter entry
			if (checkIfUserHasPermissionsToCompleteOperation(timezoneEntry, user)) {
				timezoneEntryService.delete(timezoneEntryId);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} catch (NumberFormatException e) {
			log.error(e.getMessage());
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	/**
	 * Checks if sufficient permissions or is owner of the entry
	 * 
	 * @param timezoneEntry The entry for edit
	 * @param user          The user which requested edit
	 * @return boolean
	 */
	private boolean checkIfUserHasPermissionsToCompleteOperation(TimezoneEntry timezoneEntry, User user) {
		if (timezoneEntry.getUser().getId() != user.getId()
				&& !user.getAuthorities().contains(new Role(RoleType.ADMIN))) {
			return false;
		}
		return true;
	}
}
