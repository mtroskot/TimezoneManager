const prefix = 'timezoneEntries';

const getUserTimezoneEntries = () => ({
  url: `${prefix}/user`,
  options: {
    method: 'GET'
  }
});

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

const filterAllTimezoneEntries = (input, cancelToken) => ({
  url: `${prefix}/filter?name=${input}`,
  options: {
    method: 'GET',
    cancelToken
  }
});

const filterUserTimezoneEntries = (input, cancelToken) => ({
  url: `${prefix}/user/filter?name=${input}`,
  options: {
    method: 'GET',
    cancelToken
  }
});

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
  getUserTimezoneEntries,
  saveTimezoneEntry,
  filterAllTimezoneEntries,
  filterUserTimezoneEntries,
  updateTimezoneEntry,
  deleteTimezoneEntry
};
