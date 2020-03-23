import PropTypes from 'prop-types';

export const popupMessagePropTypes = PropTypes.exact({
  message: PropTypes.string,
  position: PropTypes.oneOf(['bottom', 'top'])
});
