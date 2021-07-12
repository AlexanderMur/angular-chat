import {createFeatureSelector, createSelector} from '@ngrx/store';
import {chatFeatureName, ChatState} from './chat.reducer';

export const getChatFeatureState = createFeatureSelector(chatFeatureName);

export const selectMessages = createSelector(
  getChatFeatureState,
  (state: ChatState) => state.messages
);

export const selectRooms = createSelector(
  getChatFeatureState,
  (state: ChatState) => state.rooms
);

export const selectCurrentRoom = createSelector(
  getChatFeatureState,
  (state: ChatState) => state.currentRoom
);

export const selectLastMessage = createSelector(
  getChatFeatureState,
  (state: ChatState) => state.lastMessageSend
);
