import PropTypes from 'prop-types';

export const popupMessagePropTypes = PropTypes.exact({
  message: PropTypes.string,
  position: PropTypes.oneOf(['bottom', 'top'])
});

export const errorPropTypes = PropTypes.exact({
  display: PropTypes.bool,
  errorMessage: PropTypes.string
});

export const userPropTypes = PropTypes.exact({
  id: PropTypes.number,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  emailAddress: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired
});

export const timezoneEntryPropTypes = PropTypes.exact({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  differenceToGMT: PropTypes.string.isRequired
});

export const userSearchDataPropTypes = PropTypes.exact({
  searchResults: PropTypes.arrayOf(userPropTypes.isRequired).isRequired,
  searchQuery: PropTypes.string.isRequired,
  message: PropTypes.string
});

export const timezoneEntriesSearchDataPropTypes = PropTypes.exact({
  searchResults: PropTypes.arrayOf(timezoneEntryPropTypes.isRequired).isRequired,
  searchQuery: PropTypes.string.isRequired,
  message: PropTypes.string
});

export const dropdownOptionPropTypes = PropTypes.exact({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  requiredRole: PropTypes.string.isRequired
});

export const filterOptionPropTypes = PropTypes.exact({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
});

export const filterOptionsPropTypes = PropTypes.objectOf(
  PropTypes.arrayOf(filterOptionPropTypes.isRequired).isRequired
);
