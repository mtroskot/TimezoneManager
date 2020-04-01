import { initialState } from 'src/store/search/searchReducer';
import {
  searchSelector,
  timezoneEntriesSearchDataSelector,
  userSearchDataSelector
} from 'src/store/search/searchSelectors';

const store = {
  search: initialState
};

describe('Search selectors tests', () => {
  it('searchSelector test', () => {
    const selectedData = searchSelector(store);
    expect(selectedData).toEqual(store.search);
  });

  it('userSearchDataSelector test', () => {
    const selectedData = userSearchDataSelector(store);
    expect(selectedData).toEqual(store.search.userSearchData);
  });

  it('timezoneEntriesSearchDataSelector test', () => {
    const selectedData = timezoneEntriesSearchDataSelector(store);
    expect(selectedData).toEqual(store.search.timezoneEntriesSearchData);
  });
});
