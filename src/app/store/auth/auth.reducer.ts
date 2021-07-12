import {IUser} from '../../components/chat/model/user.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as authActions from './auth.actions';

export const authFeatureName = 'auth';

export interface AuthState {
  profile: IUser | null;
  isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
  profile: null,
  isLoggedIn: false,
};

const authReducerInternal = createReducer(
  initialAuthState,

  on(authActions.loginComplete, (state, {profile, isLoggedIn}) => {
    return {
      ...state,
      profile,
      isLoggedIn,
    };
  }),
  on(authActions.logout, (state, {}) => {
    return {
      ...state,
      profile: null,
      isLoggedIn: false,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return authReducerInternal(state, action);
}
