import { NavigationActions, StackActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function addListener(event, callback) {
  navigator.addListener(event, callback);
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

/**
 * Add a route on the top of the stack, and navigate forward to it
 * @param routeName
 * @param params
 */
function push(routeName, params) {
  navigator.dispatch(
    StackActions.push({
      routeName,
      params
    })
  );
}

/**
 * Replace current state with a new state
 * @param routeName
 * @param params
 */
function reset(routeName, params) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName,
        params
      })
    ]
  });
  navigator.dispatch(resetAction);
}

/**
 * Navigate to the top route of the stack, dismissing all other routes
 */
function popToTop() {
  navigator.dispatch(StackActions.popToTop());
}

function pop(n = 1) {
  navigator.dispatch(StackActions.pop({ n }));
}

function goBack() {
  navigator.dispatch(NavigationActions.back());
}

function closeDrawer() {
  navigator.dispatch(DrawerActions.closeDrawer());
}

function openDrawer() {
  navigator.dispatch(DrawerActions.openDrawer());
}

// add other navigation functions that you need and export them
const NavigationService = {
  setTopLevelNavigator,
  addListener,
  navigate,
  push,
  reset,
  pop,
  popToTop,
  goBack,
  closeDrawer,
  openDrawer
};
export default NavigationService;
