import {authReducer, AuthEffects} from './auth';
import {ChatEffects, chatReducer} from './chat';

export * from './auth';
export * from './chat';

export const appReducer = {
  auth: authReducer,
  chat: chatReducer,
};

export const appEffects = [AuthEffects, ChatEffects];
