import { Reducer } from 'redux';
import { UIState, UIActionTypes } from './ui.types';

export const initialState: UIState = {
  onBoardingViewed: false,
};

const reducer: Reducer<UIState> = (state = initialState, action) => {
  switch (action.type) {
    case UIActionTypes.SET_INTRO_ONBOARDING_STATE: {
      return { ...state, onBoardingViewed: action.payload.state };
    }
    default: {
      return state;
    }
  }
};

export { reducer as UIReducer };
