import { StringUtils } from 'src/utils';

const prefix = 'timezoneEntries';

const saveTimezoneEntry = timezoneEntry => {
  const { name, cityName, differenceToGMT } = timezoneEntry;
  return {
    url: `${prefix}`,
    options: {
      method: 'POST',
      validateStatus(status) {
        return [200, 201, 400].includes(status);
      },
      data: { name, cityName, differenceToGMT }
    }
  };
};

const filterTimezoneEntries = (cityName, name, gmt, cancelToken) => {
  const params = [{ key: 'cityName', value: cityName }, { key: 'name', value: name }, { key: 'gmt', value: gmt }];
  const requestParams = StringUtils.buildRequestParams(params);
  return {
    url: `${prefix}/search?${requestParams}`,
    options: {
      method: 'GET',
      cancelToken
    }
  };
};

const updateTimezoneEntry = updatedTimezoneEntry => {
  const { id, name, cityName, differenceToGMT } = updatedTimezoneEntry;
  return {
    url: `${prefix}`,
    options: {
      method: 'PUT',
      validateStatus(status) {
        return [200, 400].includes(status);
      },
      data: { id, name, cityName, differenceToGMT }
    }
  };
};

const deleteTimezoneEntry = timezoneEntryId => ({
  url: `${prefix}?timezoneEntryId=${timezoneEntryId}`,
  options: {
    method: 'DELETE'
  }
});

export default {
  saveTimezoneEntry,
  filterTimezoneEntries,
  updateTimezoneEntry,
  deleteTimezoneEntry
};
