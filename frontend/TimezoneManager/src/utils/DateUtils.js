import { format } from 'date-fns';

function formatDate(date, dateFormat) {
  return format(date, dateFormat);
}

function convertTimeToSelectedTimezoneTime(date, differenceToGMT) {
  const dateToConvert = new Date(date);
  const convertedTime = dateToConvert.setHours(
    dateToConvert.getHours() + differenceToGMT + dateToConvert.getTimezoneOffset() / 60
  );
  return convertedTime;
}

function convertShortTimeToLongTime(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

const DateUtils = {
  formatDate,
  convertTimeToSelectedTimezoneTime,
  convertShortTimeToLongTime
};

export default DateUtils;
