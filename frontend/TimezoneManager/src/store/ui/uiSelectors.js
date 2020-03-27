import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

export const popupMessageSelector = store => store.ui.popupMessage;
export const errorActionsSelector = store => store.ui.errorActions;
export const loadingActionsSelector = store => store.ui.loader.actions;
export const refreshingActionsSelector = store => store.ui.loader.refreshing;

/**
 * @param actionsToCheck Array of strings
 */
export const checkIfLoadingSelector = createSelector(
  loadingActionsSelector,
  loadingActions => memoize(actionsToCheck => loadingActions.some(action => actionsToCheck.includes(action.name)))
);

/**
 * @param actionToCheck String
 */
export const checkIfRefreshingSelector = createSelector(
  refreshingActionsSelector,
  refreshingActions => memoize(actionToCheck => refreshingActions.some(action => action === actionToCheck))
);

/**
 * @param actionsToCheck Array of strings
 */
export const checkIfErrorSelector = createSelector(
  errorActionsSelector,
  errorActions => memoize(actionsToCheck => errorActions.some(action => actionsToCheck.includes(action)))
);

export const updatingItemIdSelector = createSelector(
  loadingActionsSelector,
  loadingActions =>
    memoize(actionsToCheck => {
      const action = loadingActions.find(
        action =>
          actionsToCheck.includes(action.name) &&
          (Number.isInteger(action.params?.id) || typeof action.params?.id === 'string')
      );
      return action?.params.id;
    })
);
