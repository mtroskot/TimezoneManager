import { StoreState } from 'src/store/rootReducer';

export const timezoneEntriesSelector = (store: StoreState) => store.timezone.timezoneEntries;
export const timezoneSelector = (store: StoreState) => store.timezone;
