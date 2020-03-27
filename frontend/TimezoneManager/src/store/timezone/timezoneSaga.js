import { call, delay, put, select, takeLeading } from '@redux-saga/core/effects';
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
import { DEFAULT_ERROR } from 'src/constants/messages';
import { timezoneActionTypes } from 'src/constants/actionTypes';
import { NavigationService } from 'src/services';
import { screenNames } from 'src/constants/navigation';
import { timezoneEntriesSelector } from 'src/store/timezone/timezoneSelectors';

export function* addNewTimezoneEntrySaga({ type, payload }) {
  try {
    const { timezoneEntry } = payload;
    yield put(startAction(type));
    yield delay(1000);
    const timezoneEntryFromResponse = { ...timezoneEntry, timezoneEntryId: new Date().getTime() };
    yield put(addTimezoneEntrySuccess(timezoneEntryFromResponse));
    yield call(NavigationService.navigate, screenNames.CLOCK);
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('addNewTimezoneEntrySaga error', error);
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
    yield put(startAction(type, { id: timezoneEntry.timezoneEntryId }));
    yield delay(3000);
    const timezoneEntryFromResponse = { ...timezoneEntry };
    yield put(updateTimezoneEntrySuccess(timezoneEntryFromResponse));
    yield call(NavigationService.navigate, screenNames.SEARCH);
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('updateTimezoneEntrySaga error', error);
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
    yield delay(3000);
    yield put(deleteTimezoneEntrySuccess(timezoneEntryId));
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('deleteTimezoneEntrySaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchDeleteTimezoneEntrySaga() {
  yield takeLeading(timezoneActionTypes.DELETE_TIMEZONE_ENTRY, deleteTimezoneEntrySaga);
}

export function* fetchTimezoneEntriesSaga({ type, payload }) {
  const { refreshing } = payload;
  const timezoneEntries = yield select(timezoneEntriesSelector);
  try {
    yield put(clearErrorActions());
    yield put(refreshing ? refreshActionStart(type) : startAction(type));
    yield delay(1000);
    yield put(fetchTimezoneEntriesSuccess(timezoneEntries));
  } catch (error) {
    if (timezoneEntries.length !== 0) {
      yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    } else {
      yield put(addErrorAction(type));
    }
    console.log('fetchTimezoneEntriesSaga error', error);
  } finally {
    yield put(payload.refreshing ? refreshActionStop(type) : stopAction(type));
  }
}

export function* watchFetchTimezoneEntriesSaga() {
  yield takeLeading(timezoneActionTypes.FETCH_TIMEZONE_ENTRIES, fetchTimezoneEntriesSaga);
}
