import { StoreState } from './rootReducer';

export default {
  0: (previousVersionState: StoreState) => {
    return {
      ...previousVersionState
    };
  }
};
