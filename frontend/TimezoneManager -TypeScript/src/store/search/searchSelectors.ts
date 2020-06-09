import { dropdownOptions } from 'src/constants/search';
import { userRolesSelector } from 'src/store/user/userSelectors';
import { StoreState } from 'src/store/rootReducer';
import { eDropdowns } from 'src/types/enums';

export const searchSelector = (store: StoreState) => store.search;
export const userSearchDataSelector = (store: StoreState) => store.search.userSearchData;
export const timezoneEntriesSearchDataSelector = (store: StoreState) => store.search.timezoneEntriesSearchData;
export const allTimezoneEntriesSearchDataSelector = (store: StoreState) => store.search.allTimezoneEntriesSearchData;
export const searchOptionsSelector = (store: StoreState) => store.search.searchOptions;
export const allowedSearchOptionsSelector = (store: StoreState) => {
  const userRoles = userRolesSelector(store);
  return dropdownOptions.filter((option) => userRoles.includes(option.requiredRole));
};
export const selectedDropdownOptionSelector = (store: StoreState) => store.search.searchOptions.selectedOption;
export const filterOptionsSelector = (store: StoreState, filterOptionKey: eDropdowns) =>
  store.search.searchOptions.filterOptions[filterOptionKey];
