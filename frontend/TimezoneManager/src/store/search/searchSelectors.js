import { dropdownOptions } from 'src/constants/search';
import { userRolesSelector } from 'src/store/user/userSelectors';

export const searchSelector = store => store.search;
export const userSearchDataSelector = store => store.search.userSearchData;
export const timezoneEntriesSearchDataSelector = store => store.search.timezoneEntriesSearchData;
export const allTimezoneEntriesSearchDataSelector = store => store.search.allTimezoneEntriesSearchData;
export const searchOptionsSelector = store => store.search.searchOptions;
export const allowedSearchOptionsSelector = store => {
  const userRoles = userRolesSelector(store);
  return dropdownOptions.filter(option => userRoles.includes(option.requiredRole));
};
export const selectedDropdownOptionSelector = store => store.search.searchOptions.selectedOption;
export const filterOptionsSelector = (store, filterOptionKey) =>
  store.search.searchOptions.filterOptions[filterOptionKey];
