import { action } from 'typesafe-actions';

import { UIActionTypes } from './ui.types';

export const setOnBoardingState = (state: boolean) => action(UIActionTypes.SET_INTRO_ONBOARDING_STATE, { state });
