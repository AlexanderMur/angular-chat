import {createAction, props} from '@ngrx/store';
import {AuthState} from './auth.reducer';

export const checkAuth = createAction('[Auth] checkAuth');
export const checkAuthComplete = createAction('[Auth] checkAuthComplete', props<{ isLoggedIn: boolean }>());

export const login = createAction('[Auth] login', props<{ email: string, password: string }>());
export const loginComplete = createAction('[Auth] loginComplete', props<AuthState>());

export const logout = createAction('[Auth] logout');
export const logoutComplete = createAction('[Auth] logoutComplete');

export const signUp = createAction('[Auth] signUp', props<{ email: string, password: string, name: string }>());
export const signUpComplete = createAction('[Auth] signUpComplete');

