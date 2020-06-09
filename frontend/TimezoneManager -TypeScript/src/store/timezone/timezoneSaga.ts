import { call, put, select, takeLeading } from '@redux-saga/core/effects';
import {
  addErrorAction,
  clearErrorActions,
  refreshActionStart,
  refreshActionStop,
  startAction,
  stopAction,
  togglePopupMessage
} from 'src/store/ui/uiActions';
import {
  addTimezoneEntrySuccess,
  deleteTimezoneEntrySuccess,
  fetchTimezoneEntriesSuccess,
  updateTimezoneEntrySuccess
} from 'src/store/timezone/timezoneActions';
import { NavigationService } from 'src/services/index';
import ApiService, { timezoneRequests, userRequests } from 'src/services/api';
import { ValidationUtils } from 'src/utils/index';
import { timezoneEntriesSelector } from 'src/store/timezone/timezoneSelectors';
import { userInfoSelector } from 'src/store/user/userSelectors';
import { eIDName } from 'src/types/enums';
import { eScreenNames } from 'src/types/navigation';
import { TimezoneActionTypes } from 'src/types/store/actionTypes';
import { AddTimezoneEntry, DeleteTimezoneEntry, FetchTimezoneEntries, UpdateTimezoneEntry } from 'src/types/store/timezoneActions';

export function* addNewTimezoneEntrySaga(action: AddTimezoneEntry) {
  try {
    const { timezoneEntry } = action.payload;
    yield put(startAction(action.type));
    const response = yield call(ApiService.callApi, timezoneRequests.saveTimezoneEntry(timezoneEntry));
    if ([200, 201].includes(response.status)) {
      yield put(addTimezoneEntrySuccess(response.data));
      yield call(NavigationService.navigate, eScreenNames.CLOCK);
    } else if (response.status === 400) {
      yield put(togglePopupMessage(response.data.errors[0], 'top'));
    }
  } catch (error) {
    console.log('addNewTimezoneEntrySaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchAddNewTimezoneEntrySaga() {
  yield takeLeading(TimezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY, addNewTimezoneEntrySaga);
}

export function* updateTimezoneEntrySaga(action: UpdateTimezoneEntry) {
  try {
    const { timezoneEntry } = action.payload;
    yield put(startAction(action.type, { id: timezoneEntry[eIDName.TIMEZONE_ENTRY_ID] }));
    const response = yield call(ApiService.callApi, timezoneRequests.updateTimezoneEntry(timezoneEntry));
    yield put(updateTimezoneEntrySuccess(response.data));
    yield call(NavigationService.navigate, eScreenNames.SEARCH);
  } catch (error) {
    console.log('updateTimezoneEntrySaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchUpdateTimezoneEntrySaga() {
  yield takeLeading(TimezoneActionTypes.UPDATE_TIMEZONE_ENTRY, updateTimezoneEntrySaga);
}

export function* deleteTimezoneEntrySaga(action: DeleteTimezoneEntry) {
  try {
    const { timezoneEntryId } = action.payload;
    yield put(startAction(action.type, { id: timezoneEntryId }));
    yield call(ApiService.callApi, timezoneRequests.deleteTimezoneEntry(timezoneEntryId));
    yield put(deleteTimezoneEntrySuccess(timezoneEntryId));
  } catch (error) {
    console.log('deleteTimezoneEntrySaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchDeleteTimezoneEntrySaga() {
  yield takeLeading(TimezoneActionTypes.DELETE_TIMEZONE_ENTRY, deleteTimezoneEntrySaga);
}

export function* fetchUserTimezoneEntriesSaga(action: FetchTimezoneEntries) {
  const timezoneEntries = yield select(timezoneEntriesSelector);
  try {
    const { refreshing } = action.payload;
    const user = yield select(userInfoSelector);
    yield put(clearErrorActions());
    yield put(refreshing ? refreshActionStart(action.type) : startAction(action.type));
    const response = yield call(ApiService.callApi, userRequests.getUserTimezoneEntries(user.id));
    yield put(fetchTimezoneEntriesSuccess(response.data));
  } catch (error) {
    console.log('fetchTimezoneEntriesSaga error', error);
    if (timezoneEntries.length !== 0) {
      yield call(ValidationUtils.handleErrorMessage, error);
    } else {
      yield put(addErrorAction(action.type));
    }
  } finally {
    yield put(action.payload.refreshing ? refreshActionStop(action.type) : stopAction(action.type));
  }
}

export function* watchFetchUserTimezoneEntriesSaga() {
  yield takeLeading(TimezoneActionTypes.FETCH_USER_TIMEZONE_ENTRIES, fetchUserTimezoneEntriesSaga);
}
