package com.mtroskot.model.entity.auth;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mtroskot.model.entity.BaseEntity;
import com.mtroskot.model.entity.timezone.TimezoneEntry;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@JsonIgnoreProperties({ "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled",
		"hibernateLazyInitializer", "handler" })
public class User extends BaseEntity implements UserDetails {

	private static final long serialVersionUID = -2374365502157937877L;

	private String username;

	@NotBlank
	@Pattern(regexp = "^[A-Za-z ]{2,20}$", message = "Invalid firstName format")
	private String firstName;

	@NotBlank
	@Pattern(regexp = "^[A-Za-z ]{2,20}$", message = "Invalid lastName format")
	private String lastName;

	@NotBlank
	@Email
	@Column(unique = true)
	private String emailAddress;

	@NotBlank
	@JsonIgnore
	private String password;

	@Setter(AccessLevel.NONE)
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	private Set<Role> roles;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<TimezoneEntry> timezoneEntries;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<RefreshToken> refreshTokens;

	private boolean accountNonExpired;
	private boolean accountNonLocked;
	private boolean credentialsNonExpired;
	private boolean enabled;

	public User() {
		this.roles = new HashSet<>();
	}

	public User(String username, String emailAddress, String firstName, String lastName, String password) {
		this.username = username;
		this.emailAddress = emailAddress;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.roles = new HashSet<>();
		this.accountNonExpired = true;
		this.accountNonLocked = true;
		this.credentialsNonExpired = true;
		this.enabled = true;
	}

	public User(String emailAddress, String firstName, String lastName, String password) {
		this.username = null;
		this.emailAddress = emailAddress;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.roles = new HashSet<>();
		this.accountNonExpired = true;
		this.accountNonLocked = true;
		this.credentialsNonExpired = true;
		this.enabled = true;
	}

	@JsonIgnore
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles;
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}

}
