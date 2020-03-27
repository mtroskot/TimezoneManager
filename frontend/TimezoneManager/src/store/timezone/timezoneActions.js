import { timezoneActionTypes } from 'src/constants/actionTypes';

export function addTimezoneEntry(timezoneEntry) {
  return {
    type: timezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY,
    payload: { timezoneEntry }
  };
}

export const addTimezoneEntrySuccess = timezoneEntry => {
  return {
    type: timezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY_SUCCESS,
    payload: { timezoneEntry }
  };
};

export function updateTimezoneEntry(timezoneEntry) {
  return {
    type: timezoneActionTypes.UPDATE_TIMEZONE_ENTRY,
    payload: { timezoneEntry }
  };
}

export const updateTimezoneEntrySuccess = timezoneEntry => {
  return {
    type: timezoneActionTypes.UPDATE_TIMEZONE_ENTRY_SUCCESS,
    payload: { timezoneEntry }
  };
};

export function deleteTimezoneEntry(timezoneEntryId) {
  return {
    type: timezoneActionTypes.DELETE_TIMEZONE_ENTRY,
    payload: { timezoneEntryId }
  };
}

export const deleteTimezoneEntrySuccess = timezoneEntryId => {
  return {
    type: timezoneActionTypes.DELETE_TIMEZONE_ENTRY_SUCCESS,
    payload: { timezoneEntryId }
  };
};

export function fetchTimezoneEntries(refreshing) {
  return {
    type: timezoneActionTypes.FETCH_TIMEZONE_ENTRIES,
    payload: { refreshing }
  };
}

export const fetchTimezoneEntriesSuccess = timezoneEntries => {
  return {
    type: timezoneActionTypes.FETCH_TIMEZONE_ENTRIES_SUCCESS,
    payload: { timezoneEntries }
  };
};
