import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
import { StoreState } from '../rootReducer';
import { StoreActionTypes } from 'src/types/store/actionTypes';
import { iAction } from 'src/types/interfaces';

export const popupMessageSelector = (store: StoreState) => store.ui.popupMessage;
export const errorActionsSelector = (store: StoreState) => store.ui.errorActions;
export const loadingActionsSelector = (store: StoreState) => store.ui.loader.actions;
export const refreshingActionsSelector = (store: StoreState) => store.ui.loader.refreshing;

/**
 * @param actionsToCheck Array of strings
 */
export const checkIfLoadingSelector = createSelector(loadingActionsSelector, (loadingActions: iAction[]) =>
  memoize((actionsToCheck: StoreActionTypes[]) => loadingActions.some((action: iAction) => actionsToCheck.includes(action.name)))
);

/**
 * @param actionToCheck String
 */
export const checkIfRefreshingSelector = createSelector(refreshingActionsSelector, (refreshingActions: StoreActionTypes[]) =>
  memoize((actionToCheck: StoreActionTypes) => refreshingActions.some((action: StoreActionTypes) => action === actionToCheck))
);

/**
 * @param actionsToCheck Array of strings
 */
export const checkIfErrorSelector = createSelector(errorActionsSelector, (errorActions: StoreActionTypes[]) =>
  memoize((actionsToCheck: StoreActionTypes[]) => errorActions.some((action) => actionsToCheck.includes(action)))
);

export const updatingItemIdSelector = createSelector(loadingActionsSelector, (loadingActions: iAction[]) =>
  memoize((actionsToCheck: StoreActionTypes[]) => {
    const action = loadingActions.find(
      (action: iAction) =>
        actionsToCheck.includes(action.name) && (Number.isInteger(action.params?.id) || typeof action.params?.id === 'string')
    );
    return action?.params?.id;
  })
);
