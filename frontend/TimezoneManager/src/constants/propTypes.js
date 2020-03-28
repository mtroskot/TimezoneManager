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
  userId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  emailAddress: PropTypes.string,
  role: PropTypes.string
});

export const timezoneEntryPropTypes = PropTypes.exact({
  timezoneEntryId: PropTypes.number.isRequired,
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
