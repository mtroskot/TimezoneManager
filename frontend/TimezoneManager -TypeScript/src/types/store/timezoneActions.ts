import { TimezoneActionTypes } from 'src/types/store/actionTypes';
import { iTimezoneEntry, iSavedTimezoneEntry } from 'src/types/interfaces';

export interface AddTimezoneEntry {
  type: TimezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY;
  payload: { timezoneEntry: iTimezoneEntry };
}

 interface AddTimezoneEntrySuccess {
  type: TimezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY_SUCCESS;
  payload: { timezoneEntry: iSavedTimezoneEntry };
}

export interface UpdateTimezoneEntry {
  type: TimezoneActionTypes.UPDATE_TIMEZONE_ENTRY;
  payload: { timezoneEntry: iSavedTimezoneEntry };
}

 interface UpdateTimezoneEntrySuccess {
  type: TimezoneActionTypes.UPDATE_TIMEZONE_ENTRY_SUCCESS;
  payload: { updatedTimezoneEntry: iSavedTimezoneEntry };
}

export interface DeleteTimezoneEntry {
  type: TimezoneActionTypes.DELETE_TIMEZONE_ENTRY;
  payload: { timezoneEntryId: number };
}

 interface DeleteTimezoneEntrySuccess {
  type: TimezoneActionTypes.DELETE_TIMEZONE_ENTRY_SUCCESS;
  payload: { timezoneEntryId: number };
}

export interface FetchTimezoneEntries {
  type: TimezoneActionTypes.FETCH_USER_TIMEZONE_ENTRIES;
  payload: { refreshing?: boolean };
}

 interface FetchTimezoneEntriesSuccess {
  type: TimezoneActionTypes.FETCH_USER_TIMEZONE_ENTRIES_SUCCESS;
  payload: { timezoneEntries: iSavedTimezoneEntry[] };
}

export type TimezoneActions =
  | AddTimezoneEntry
  | AddTimezoneEntrySuccess
  | UpdateTimezoneEntry
  | UpdateTimezoneEntrySuccess
  | DeleteTimezoneEntry
  | DeleteTimezoneEntrySuccess
  | FetchTimezoneEntries
  | FetchTimezoneEntriesSuccess;
