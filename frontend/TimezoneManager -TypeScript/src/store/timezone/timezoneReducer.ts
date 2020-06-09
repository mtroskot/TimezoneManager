import { ArrayUtils } from 'src/utils/index';
import { TimezoneActions } from 'src/types/store/timezoneActions';
import { TimezoneActionTypes } from 'src/types/store/actionTypes';
import { iSavedTimezoneEntry } from 'src/types/interfaces';
import { eIDName } from 'src/types/enums';

interface TimezoneState {
  timezoneEntries: iSavedTimezoneEntry[];
}

export const initialState: TimezoneState = {
  timezoneEntries: []
};

const timezoneReducer = (state = initialState, action: TimezoneActions) => {
  switch (action.type) {
    case TimezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        timezoneEntries: [...state.timezoneEntries, action.payload.timezoneEntry]
      };
    case TimezoneActionTypes.FETCH_USER_TIMEZONE_ENTRIES_SUCCESS:
      return {
        ...state,
        timezoneEntries: action.payload.timezoneEntries
      };
    case TimezoneActionTypes.UPDATE_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        timezoneEntries: ArrayUtils.updateItemInList<iSavedTimezoneEntry>(
          state.timezoneEntries,
          eIDName.TIMEZONE_ENTRY_ID,
          action.payload.updatedTimezoneEntry
        )
      };
    case TimezoneActionTypes.DELETE_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        timezoneEntries: ArrayUtils.removeItemFromList<iSavedTimezoneEntry>(
          state.timezoneEntries,
          eIDName.TIMEZONE_ENTRY_ID,
          action.payload.timezoneEntryId
        )
      };
    default:
      return state;
  }
};

export default timezoneReducer;
