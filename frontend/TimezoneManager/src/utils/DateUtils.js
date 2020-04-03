import { differenceInHours, format } from 'date-fns';

/**
 * Formated date in given format
 * @param date {Date|String} A valid date object or valid date string
 * @param dateFormat {String} A valid date format
 * @returns {String} Converted date
 */
function formatDate(date, dateFormat) {
  return format(date, dateFormat);
}

/**
 * Converts time in current timezone to time in wanted timezone
 * @param date {Date} The date to be converted
 * @param differenceToGMT {String|Number} The difference to GMT
 * @returns {Date}  Converted date
 */
function convertTimeToSelectedTimezoneTime(date, differenceToGMT) {
  const dateToConvert = new Date(date);
  const convertedTime = dateToConvert.setHours(
    dateToConvert.getHours() +
      parseInt(String(differenceToGMT).replace('+', ''), 10) +
      dateToConvert.getTimezoneOffset() / 60
  );
  return new Date(convertedTime);
}

/**
 * Converts 1 decimal number to 2 decimal number by appending 0 at beginning of string.
 * @param time {Number} The number to be converted
 * @returns {String} Converted number
 */
function convertShortTimeToLongTime(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

/**
 * Returns difference in hours between two dates. Difference in String format with + prefix for positive differences.
 * @param date1 {Date} The start date
 * @param date2 {Date} The end date
 * @returns {String}
 */
function getDifferenceInHours(date1, date2) {
  const diff = differenceInHours(date1, date2);
  return diff > 0 ? `+${diff}` : `${diff}`;
}

const DateUtils = {
  formatDate,
  convertTimeToSelectedTimezoneTime,
  convertShortTimeToLongTime,
  getDifferenceInHours
};

export default DateUtils;
