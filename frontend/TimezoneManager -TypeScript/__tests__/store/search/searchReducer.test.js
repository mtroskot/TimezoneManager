import searchReducer from 'src/store/search/searchReducer';
import * as searchActions from 'src/store/search/searchActions';
import * as timezoneActions from 'src/store/timezone/timezoneActions';
import * as userActions from 'src/store/user/userActions';
import { idNames } from 'src/constants/idKeyNames';
import { initialState } from 'src/store/search/searchReducer';

describe('INITIAL STATE', () => {
  const beforeActionState = initialState;

  it('1returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('2returns searchUserTimezoneEntriesSuccess action state', () => {
    const searchData = {
      searchResults: [],
      searchQuery: 'Abc',
      message: 'No results'
    };
    const action = searchActions.searchUserTimezoneEntriesSuccess(searchData);
    const { payload } = action;
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: {
        searchResults: payload.searchData.searchResults,
        searchQuery: payload.searchData.searchQuery,
        message: payload.searchData.message
      },
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('2.1returns searchAllTimezoneEntriesSuccess action state', () => {
    const searchData = {
      searchResults: [],
      searchQuery: 'Abc',
      message: 'No results'
    };
    const action = searchActions.searchAllTimezoneEntriesSuccess(searchData);
    const { payload } = action;
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData,
      allTimezoneEntriesSearchData: {
        searchResults: payload.searchData.searchResults,
        searchQuery: payload.searchData.searchQuery,
        message: payload.searchData.message
      }
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('3returns searchUsersSuccess action state', () => {
    const searchData = {
      searchResults: [],
      searchQuery: 'Abc',
      message: 'No results'
    };
    const action = searchActions.searchUsersSuccess(searchData);
    const { payload } = action;
    const expectedState = {
      ...beforeActionState,
      userSearchData: {
        searchResults: payload.searchData.searchResults,
        searchQuery: payload.searchData.searchQuery,
        message: payload.searchData.message
      },
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('4returns updateSearchedUserInfoSuccess action state', () => {
    const updatedUserInfo = {
      [idNames.USER_ID]: 2,
      firstName: 'Marko',
      lastName: 'Troskot',
      emailAddress: 'marko@hotmail.com'
    };
    const action = searchActions.updateSearchedUserInfoSuccess(updatedUserInfo);
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('5returns updateTimezoneEntrySuccess action state', () => {
    const updatedTimezoneEntry = {
      [idNames.TIMEZONE_ENTRY_ID]: 2,
      name: 'Foo',
      cityName: 'Bar',
      differenceToGMT: '+2'
    };
    const action = timezoneActions.updateTimezoneEntrySuccess(updatedTimezoneEntry);
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('6returns deleteUserSuccess action state', () => {
    const userId = 2;
    const action = userActions.deleteUserSuccess(userId);
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('7returns deleteTimezoneEntrySuccess action state', () => {
    const timezoneEntryId = 2;
    const action = timezoneActions.deleteTimezoneEntrySuccess(timezoneEntryId);
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('8returns clearAllSearches action state', () => {
    const action = searchActions.clearAllSearches();
    const expectedState = {
      ...beforeActionState,
      userSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      },
      timezoneEntriesSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      },
      allTimezoneEntriesSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      }
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('9returns clearUsersSearch action state', () => {
    const action = searchActions.clearUsersSearch();
    const expectedState = {
      ...beforeActionState,
      userSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      },
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('10returns clearTimezoneEntriesSearch action state', () => {
    const action = searchActions.clearTimezoneEntriesSearch();
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      },
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('11returns clearTimezoneEntriesSearch action state', () => {
    const action = searchActions.clearAllTimezoneEntriesSearch();
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      }
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });
});

describe('LOADED STATE', () => {
  const beforeActionState = {
    ...initialState,
    userSearchData: {
      searchResults: [
        { [idNames.USER_ID]: 2, firstName: 'Marko', lastName: 'Troskot', emailAddress: 'marko@hotmail.com' },
        { [idNames.USER_ID]: 3, firstName: 'Ante', lastName: 'Mate', emailAddress: 'ante@hotmail.com' }
      ],
      searchQuery: 'Abcd',
      message: 'msg'
    },
    timezoneEntriesSearchData: {
      searchResults: [
        { [idNames.TIMEZONE_ENTRY_ID]: 2, name: 'Foo', cityName: 'Bar', differenceToGMT: '+2' },
        { [idNames.TIMEZONE_ENTRY_ID]: 3, name: 'Fch', cityName: 'Abc', differenceToGMT: '+10' }
      ],
      searchQuery: 'Abc',
      message: 'message'
    },
    allTimezoneEntriesSearchData: {
      searchResults: [
        { [idNames.TIMEZONE_ENTRY_ID]: 2, name: 'Foo', cityName: 'Bar', differenceToGMT: '+2' },
        { [idNames.TIMEZONE_ENTRY_ID]: 3, name: 'Fch', cityName: 'Abc', differenceToGMT: '+10' },
        { [idNames.TIMEZONE_ENTRY_ID]: 4, name: 'US', cityName: 'NY', differenceToGMT: '+1' },
        { [idNames.TIMEZONE_ENTRY_ID]: 5, name: 'HR', cityName: 'ZD', differenceToGMT: '-10' }
      ],
      searchQuery: 'Abc',
      message: 'message'
    }
  };

  it('1returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('2returns searchUserTimezoneEntriesSuccess action state', () => {
    const searchData = {
      searchResults: [],
      searchQuery: 'Abcdef',
      message: 'No results'
    };
    const action = searchActions.searchUserTimezoneEntriesSuccess(searchData);
    const { payload } = action;
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: {
        searchResults: payload.searchData.searchResults,
        searchQuery: payload.searchData.searchQuery,
        message: payload.searchData.message
      },
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('2.1returns searchAllTimezoneEntriesSuccess action state', () => {
    const searchData = {
      searchResults: [],
      searchQuery: 'Abcdef',
      message: 'No results'
    };
    const action = searchActions.searchAllTimezoneEntriesSuccess(searchData);
    const { payload } = action;
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: {
        searchResults: payload.searchData.searchResults,
        searchQuery: payload.searchData.searchQuery,
        message: payload.searchData.message
      }
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('3returns searchUsersSuccess action state', () => {
    const searchData = {
      searchResults: [],
      searchQuery: 'Abc',
      message: 'No results'
    };
    const action = searchActions.searchUsersSuccess(searchData);
    const { payload } = action;
    const expectedState = {
      ...beforeActionState,
      userSearchData: {
        searchResults: payload.searchData.searchResults,
        searchQuery: payload.searchData.searchQuery,
        message: payload.searchData.message
      },
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('4returns updateSearchedUserInfoSuccess action state', () => {
    const updatedUserInfo = {
      [idNames.USER_ID]: 2,
      firstName: 'Marko',
      lastName: 'Troskot',
      emailAddress: 'marko@hotmail.com'
    };
    const action = searchActions.updateSearchedUserInfoSuccess(updatedUserInfo);
    const { payload } = action;
    const expectedState = {
      ...beforeActionState,
      userSearchData: {
        searchResults: [
          payload.updatedUserInfo,
          { [idNames.USER_ID]: 3, firstName: 'Ante', lastName: 'Mate', emailAddress: 'ante@hotmail.com' }
        ],
        searchQuery: beforeActionState.userSearchData.searchQuery,
        message: beforeActionState.userSearchData.message
      },
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('5returns updateTimezoneEntrySuccess action state', () => {
    const updatedTimezoneEntry = {
      [idNames.TIMEZONE_ENTRY_ID]: 2,
      name: 'NewFoo',
      cityName: 'NewBar',
      differenceToGMT: '-5'
    };
    const action = timezoneActions.updateTimezoneEntrySuccess(updatedTimezoneEntry);
    const { payload } = action;
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: {
        searchResults: [
          payload.updatedTimezoneEntry,
          { [idNames.TIMEZONE_ENTRY_ID]: 3, name: 'Fch', cityName: 'Abc', differenceToGMT: '+10' }
        ],
        searchQuery: beforeActionState.timezoneEntriesSearchData.searchQuery,
        message: beforeActionState.timezoneEntriesSearchData.message
      },
      allTimezoneEntriesSearchData: {
        searchResults: [
          payload.updatedTimezoneEntry,
          { [idNames.TIMEZONE_ENTRY_ID]: 3, name: 'Fch', cityName: 'Abc', differenceToGMT: '+10' },
          { [idNames.TIMEZONE_ENTRY_ID]: 4, name: 'US', cityName: 'NY', differenceToGMT: '+1' },
          { [idNames.TIMEZONE_ENTRY_ID]: 5, name: 'HR', cityName: 'ZD', differenceToGMT: '-10' }
        ],
        searchQuery: beforeActionState.allTimezoneEntriesSearchData.searchQuery,
        message: beforeActionState.allTimezoneEntriesSearchData.message
      }
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('6returns deleteUserSuccess action state', () => {
    const userId = 2;
    const action = userActions.deleteUserSuccess(userId);
    const expectedState = {
      ...beforeActionState,
      userSearchData: {
        searchResults: [
          { [idNames.USER_ID]: 3, firstName: 'Ante', lastName: 'Mate', emailAddress: 'ante@hotmail.com' }
        ],
        searchQuery: beforeActionState.userSearchData.searchQuery,
        message: beforeActionState.userSearchData.message
      },
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('7returns deleteTimezoneEntrySuccess action state', () => {
    const timezoneEntryId = 2;
    const action = timezoneActions.deleteTimezoneEntrySuccess(timezoneEntryId);
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: {
        searchResults: [{ [idNames.TIMEZONE_ENTRY_ID]: 3, name: 'Fch', cityName: 'Abc', differenceToGMT: '+10' }],
        searchQuery: beforeActionState.timezoneEntriesSearchData.searchQuery,
        message: beforeActionState.timezoneEntriesSearchData.message
      },
      allTimezoneEntriesSearchData: {
        searchResults: [
          { [idNames.TIMEZONE_ENTRY_ID]: 3, name: 'Fch', cityName: 'Abc', differenceToGMT: '+10' },
          { [idNames.TIMEZONE_ENTRY_ID]: 4, name: 'US', cityName: 'NY', differenceToGMT: '+1' },
          { [idNames.TIMEZONE_ENTRY_ID]: 5, name: 'HR', cityName: 'ZD', differenceToGMT: '-10' }
        ],
        searchQuery: beforeActionState.timezoneEntriesSearchData.searchQuery,
        message: beforeActionState.timezoneEntriesSearchData.message
      }
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('8returns clearAllSearches action state', () => {
    const action = searchActions.clearAllSearches();
    const expectedState = {
      ...beforeActionState,
      userSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      },
      timezoneEntriesSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      },
      allTimezoneEntriesSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      }
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('9returns clearUsersSearch action state', () => {
    const action = searchActions.clearUsersSearch();
    const expectedState = {
      ...beforeActionState,
      userSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      },
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('10returns clearTimezoneEntriesSearch action state', () => {
    const action = searchActions.clearTimezoneEntriesSearch();
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      },
      allTimezoneEntriesSearchData: beforeActionState.allTimezoneEntriesSearchData
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('11returns clearTimezoneEntriesSearch action state', () => {
    const action = searchActions.clearAllTimezoneEntriesSearch();
    const expectedState = {
      ...beforeActionState,
      userSearchData: beforeActionState.userSearchData,
      timezoneEntriesSearchData: beforeActionState.timezoneEntriesSearchData,
      allTimezoneEntriesSearchData: {
        searchResults: [],
        searchQuery: '',
        message: ''
      }
    };
    expect(searchReducer(beforeActionState, action)).toEqual(expectedState);
    expect(searchReducer(beforeActionState, action)).toMatchSnapshot();
  });
});
