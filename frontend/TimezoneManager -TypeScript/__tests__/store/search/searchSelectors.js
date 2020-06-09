import {
  allTimezoneEntriesSearchDataSelector,
  searchSelector,
  timezoneEntriesSearchDataSelector,
  userSearchDataSelector
} from 'src/store/search/searchSelectors';

const store = {
  search: {
    userSearchData: {
      searchResults: [1, 2, 3],
      searchQuery: 'adas',
      message: 'abs'
    },
    timezoneEntriesSearchData: {
      searchResults: [8],
      searchQuery: 'asfdabs',
      message: 'asasf'
    },
    allTimezoneEntriesSearchData: {
      searchResults: [4, 5, 6],
      searchQuery: 'sdavs',
      message: 'asdvasdfgweq'
    }
  }
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

  it('allTimezoneEntriesSearchData test', () => {
    const selectedData = allTimezoneEntriesSearchDataSelector(store);
    expect(selectedData).toEqual(store.search.allTimezoneEntriesSearchData);
  });
});
