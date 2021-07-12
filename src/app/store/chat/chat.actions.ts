import {createAction, props} from '@ngrx/store';
import {IRoom} from '../../components/chat/model/room.model';
import {IMessage} from '../../components/chat/model/message.model';

export const getRooms = createAction('[Chat] get rooms');
export const getRoomsComplete = createAction('[Chat] get complete rooms', props<{ data }>());

export const createRoom = createAction('[Chat] create room', props<{ name: string }>());
export const createRoomComplete = createAction('[Chat] create room complete', props<{ data: IRoom[] }>());

export const renameRoom = createAction('[Chat] rename room', props<{ id: string, name: string }>());
export const renameRoomComplete = createAction('[Chat] rename room complete', props<{ data: IRoom[] }>());

export const deleteRoom = createAction('[Chat] delete room', props<{ id: string }>());
export const deleteRoomComplete = createAction('[Chat] delete room complete', props<{ data: IRoom[] }>());

export const changeRoom = createAction('[Chat] change room', props<{ room: IRoom }>());
export const changeRoomComplete = createAction('[Chat] change room complete', props<{ room: IRoom }>());

export const getMessages = createAction('[Chat] get messages');
export const getMessagesComplete = createAction('[Chat] get messages complete', props<{ data }>());

export const sendMessage = createAction('[Chat] send message', props<{ id: string, text: string }>());
export const sendMessageComplete = createAction('[Chat] send message complete', props<{ payload: IMessage }>());

export const editMessage = createAction('[Chat] edit message', props<{ id: string, text: string }>());

export const processLikeMsg = createAction('[Chat] process like msg', props<{ id: string }>());
