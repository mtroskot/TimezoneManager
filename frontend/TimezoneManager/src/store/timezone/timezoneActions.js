import { timezoneActionTypes } from 'src/constants/actionTypes';

export const addTimezoneEntry = timezoneEntry => ({
  type: timezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY,
  payload: { timezoneEntry }
});

export const addTimezoneEntrySuccess = timezoneEntry => ({
  type: timezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY_SUCCESS,
  payload: { timezoneEntry }
});

export const updateTimezoneEntry = timezoneEntry => ({
  type: timezoneActionTypes.UPDATE_TIMEZONE_ENTRY,
  payload: { timezoneEntry }
});

export const updateTimezoneEntrySuccess = updatedTimezoneEntry => ({
  type: timezoneActionTypes.UPDATE_TIMEZONE_ENTRY_SUCCESS,
  payload: { updatedTimezoneEntry }
});

export const deleteTimezoneEntry = timezoneEntryId => ({
  type: timezoneActionTypes.DELETE_TIMEZONE_ENTRY,
  payload: { timezoneEntryId }
});

export const deleteTimezoneEntrySuccess = timezoneEntryId => ({
  type: timezoneActionTypes.DELETE_TIMEZONE_ENTRY_SUCCESS,
  payload: { timezoneEntryId }
});

export const fetchTimezoneEntries = refreshing => ({
  type: timezoneActionTypes.FETCH_TIMEZONE_ENTRIES,
  payload: { refreshing }
});

export const fetchTimezoneEntriesSuccess = timezoneEntries => ({
  type: timezoneActionTypes.FETCH_TIMEZONE_ENTRIES_SUCCESS,
  payload: { timezoneEntries }
});
