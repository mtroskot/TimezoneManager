package com.mtroskot.model.entity.auth;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import org.hibernate.annotations.NaturalId;
import org.springframework.security.core.GrantedAuthority;

import com.mtroskot.model.entity.BaseEntity;
import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "type", callSuper = false)
@Entity
public class Role extends BaseEntity implements GrantedAuthority {

	private static final long serialVersionUID = -8452950149466222837L;

	@NaturalId
	@Enumerated(EnumType.STRING)
	@NotNull
	private RoleType type;

	@Override
	public String getAuthority() {
		return this.type.toString();
	}

	public static enum RoleType {
		USER, MANAGER, ADMIN,
	}
}
