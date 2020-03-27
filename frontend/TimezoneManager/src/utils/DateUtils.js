import { differenceInHours, format } from 'date-fns';

function formatDate(date, dateFormat) {
  return format(date, dateFormat);
}

/**
 * Converts time in current timezone to time in wanted timezone
 * @param date
 * @param differenceToGMT String or Number
 * @returns {Date}
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

function convertShortTimeToLongTime(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

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
