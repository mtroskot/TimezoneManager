import { TimezoneActionTypes } from 'src/types/store/actionTypes';
import { iSavedTimezoneEntry, iTimezoneEntry } from 'src/types/interfaces';
import { TimezoneActions } from 'src/types/store/timezoneActions';

export const addTimezoneEntry = (timezoneEntry: iTimezoneEntry): TimezoneActions => ({
  type: TimezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY,
  payload: { timezoneEntry }
});

export const addTimezoneEntrySuccess = (timezoneEntry: iSavedTimezoneEntry): TimezoneActions => ({
  type: TimezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY_SUCCESS,
  payload: { timezoneEntry }
});

export const updateTimezoneEntry = (timezoneEntry: iSavedTimezoneEntry): TimezoneActions => ({
  type: TimezoneActionTypes.UPDATE_TIMEZONE_ENTRY,
  payload: { timezoneEntry }
});

export const updateTimezoneEntrySuccess = (updatedTimezoneEntry: iSavedTimezoneEntry): TimezoneActions => ({
  type: TimezoneActionTypes.UPDATE_TIMEZONE_ENTRY_SUCCESS,
  payload: { updatedTimezoneEntry }
});

export const deleteTimezoneEntry = (timezoneEntryId: number): TimezoneActions => ({
  type: TimezoneActionTypes.DELETE_TIMEZONE_ENTRY,
  payload: { timezoneEntryId }
});

export const deleteTimezoneEntrySuccess = (timezoneEntryId: number): TimezoneActions => ({
  type: TimezoneActionTypes.DELETE_TIMEZONE_ENTRY_SUCCESS,
  payload: { timezoneEntryId }
});

export const fetchTimezoneEntries = (refreshing?: boolean): TimezoneActions => ({
  type: TimezoneActionTypes.FETCH_USER_TIMEZONE_ENTRIES,
  payload: { refreshing }
});

export const fetchTimezoneEntriesSuccess = (timezoneEntries: iSavedTimezoneEntry[]): TimezoneActions => ({
  type: TimezoneActionTypes.FETCH_USER_TIMEZONE_ENTRIES_SUCCESS,
  payload: { timezoneEntries }
});
