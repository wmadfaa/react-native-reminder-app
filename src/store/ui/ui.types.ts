export enum UIActionTypes {
  SET_INTRO_ONBOARDING_STATE = '@ui/SET_INTRO_ONBOARDING_STATE',
}

export interface UIState {
  readonly onBoardingViewed: boolean;
}
