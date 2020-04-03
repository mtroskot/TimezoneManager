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
import { timezoneActionTypes } from 'src/constants/actionTypes';
import { NavigationService } from 'src/services';
import ApiService, { timezoneRequests } from 'src/services/api';
import { AppUtils } from 'src/utils';
import { screenNames } from 'src/constants/navigation';
import { timezoneEntriesSelector } from 'src/store/timezone/timezoneSelectors';
import { idNames } from 'src/constants/idKeyNames';

export function* addNewTimezoneEntrySaga({ type, payload }) {
  try {
    const { timezoneEntry } = payload;
    yield put(startAction(type));
    const response = yield call(ApiService.callApi, timezoneRequests.saveTimezoneEntry(timezoneEntry));
    if ([200, 201].includes(response.status)) {
      yield put(addTimezoneEntrySuccess(response.data));
      yield call(NavigationService.navigate, screenNames.CLOCK);
    } else if (response.status === 400) {
      yield put(togglePopupMessage(response.data.errors[0], 'top'));
    }
  } catch (error) {
    console.log('addNewTimezoneEntrySaga error', error);
    yield call(AppUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchAddNewTimezoneEntrySaga() {
  yield takeLeading(timezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY, addNewTimezoneEntrySaga);
}

export function* updateTimezoneEntrySaga({ type, payload }) {
  try {
    const { timezoneEntry } = payload;
    yield put(startAction(type, { id: timezoneEntry[idNames.TIMEZONE_ENTRY_ID] }));
    const response = yield call(ApiService.callApi, timezoneRequests.updateTimezoneEntry(timezoneEntry));
    yield put(updateTimezoneEntrySuccess(response.data));
    yield call(NavigationService.navigate, screenNames.SEARCH);
  } catch (error) {
    console.log('updateTimezoneEntrySaga error', error);
    yield call(AppUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchUpdateTimezoneEntrySaga() {
  yield takeLeading(timezoneActionTypes.UPDATE_TIMEZONE_ENTRY, updateTimezoneEntrySaga);
}

export function* deleteTimezoneEntrySaga({ type, payload }) {
  try {
    const { timezoneEntryId } = payload;
    yield put(startAction(type, { id: timezoneEntryId }));
    yield call(ApiService.callApi, timezoneRequests.deleteTimezoneEntry(timezoneEntryId));
    yield put(deleteTimezoneEntrySuccess(timezoneEntryId));
  } catch (error) {
    console.log('deleteTimezoneEntrySaga error', error);
    yield call(AppUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchDeleteTimezoneEntrySaga() {
  yield takeLeading(timezoneActionTypes.DELETE_TIMEZONE_ENTRY, deleteTimezoneEntrySaga);
}

export function* fetchTimezoneEntriesSaga({ type, payload }) {
  const timezoneEntries = yield select(timezoneEntriesSelector);
  try {
    const { refreshing } = payload;
    yield put(clearErrorActions());
    yield put(refreshing ? refreshActionStart(type) : startAction(type));
    const response = yield call(ApiService.callApi, timezoneRequests.getUserTimezoneEntries());
    yield put(fetchTimezoneEntriesSuccess(response.data));
  } catch (error) {
    console.log('fetchTimezoneEntriesSaga error', error);
    if (timezoneEntries.length !== 0) {
      yield call(AppUtils.handleErrorMessage, error);
    } else {
      yield put(addErrorAction(type));
    }
  } finally {
    yield put(payload.refreshing ? refreshActionStop(type) : stopAction(type));
  }
}

export function* watchFetchTimezoneEntriesSaga() {
  yield takeLeading(timezoneActionTypes.FETCH_TIMEZONE_ENTRIES, fetchTimezoneEntriesSaga);
}
