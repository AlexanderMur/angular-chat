import {IMessage} from '../../components/chat/model/message.model';
import {IRoom} from '../../components/chat/model/room.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as chatActions from './chat.actions';

export const chatFeatureName = 'chat';

export interface ChatState {
  messages: IMessage[] | null;
  rooms: IRoom[] | null;
  currentRoom: IRoom | null;
  lastMessageSend: IMessage | null;
}

export const initialChatState: ChatState = {
  messages: [],
  rooms: [],
  currentRoom: null,
  lastMessageSend: null,
};

const chatReducerInternal = createReducer(
  initialChatState,

  on(chatActions.getRoomsComplete, (state, {data}) => {
    return {
      ...state,
      rooms: data,
    };
  }),

  on(chatActions.changeRoomComplete, (state, {room}) => {
    return {
      ...state,
      currentRoom: room,
    };
  }),

  on(chatActions.getMessagesComplete, (state, {data}) => {
    return {
      ...state,
      messages: data,
    };
  }),

  on(chatActions.sendMessageComplete, (state, {payload}) => {
    return {
      ...state,
      lastMessageSend: payload,
    };
  })
);

export function chatReducer(state: ChatState | undefined, action: Action) {
  return chatReducerInternal(state, action);
}
