import { NavigationActions, StackActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { cloneDeep } from 'lodash';
import { ObjectUtils } from '../../utils';
import { tObject } from '../../types/types';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function addListener(event, callback): void {
  navigator.addListener(event, callback);
}

function navigate(routeName: string, params?: object): void {
  if (ObjectUtils.exists(params)) {
    params = cloneDeep(params);
  }
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
function push(routeName: string, params?: object): void {
  if (ObjectUtils.exists(params)) {
    params = cloneDeep(params);
  }
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
function reset(routeName: string, params?: tObject): void {
  if (ObjectUtils.exists(params)) {
    params = cloneDeep(params);
  }
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
function popToTop(): void {
  navigator.dispatch(StackActions.popToTop());
}

function pop(n: number = 1): void {
  navigator.dispatch(StackActions.pop({ n }));
}

function goBack(): void {
  navigator.dispatch(NavigationActions.back());
}

function closeDrawer(): void {
  navigator.dispatch(DrawerActions.closeDrawer());
}

function openDrawer(): void {
  navigator.dispatch(DrawerActions.openDrawer());
}

function getCurrentScreenName(): string {
  let route = navigator.state.nav;
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route.routeName;
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
  openDrawer,
  getCurrentScreenName
};
export default NavigationService;
