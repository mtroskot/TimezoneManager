import { timezoneActionTypes } from 'src/constants/actionTypes';
import { ArrayUtils } from 'src/utils';
import { idNames } from 'src/constants/idKeyNames';

const initialState = {
  timezoneEntries: []
};

const timezoneReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case timezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        timezoneEntries: [...state.timezoneEntries, payload.timezoneEntry]
      };
    case timezoneActionTypes.FETCH_TIMEZONE_ENTRIES_SUCCESS:
      return {
        ...state,
        timezoneEntries: payload.timezoneEntries
      };
    case timezoneActionTypes.UPDATE_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        timezoneEntries: ArrayUtils.updateItemInList(
          state.timezoneEntries,
          idNames.TIMEZONE_ENTRY_ID,
          payload.timezoneEntry
        )
      };
    case timezoneActionTypes.DELETE_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        timezoneEntries: ArrayUtils.removeItemFromList(
          state.timezoneEntries,
          idNames.TIMEZONE_ENTRY_ID,
          payload.timezoneEntryId
        )
      };
    default:
      return state;
  }
};

export default timezoneReducer;
