package com.mtroskot.model.entity.timezone;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mtroskot.model.entity.BaseEntity;
import com.mtroskot.model.entity.auth.User;
import com.mtroskot.validation.GMTConstraint;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "TIMEZONE_ENTRIES")
public class TimezoneEntry extends BaseEntity {

	private static final long serialVersionUID = -932204876909090210L;

	@NotBlank
	private String name;

	@NotBlank
	private String cityName;

	@GMTConstraint
	private String differenceToGMT;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userId")
	private User user;

}
