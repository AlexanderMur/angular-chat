import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as chatActions from './chat.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ChatService} from '../../services/chat.service';
import {EMPTY, from, of} from 'rxjs';

@Injectable()
export class ChatEffects {
  constructor(
    private actions$: Actions,
    private chatService: ChatService,
  ) {
  }

  @Effect()
  getRooms$ = this.actions$.pipe(
    ofType(chatActions.getRooms),
    switchMap(() =>
      this.chatService.getRooms
        .pipe(
          map((payload) => chatActions.getRoomsComplete({data: payload.data}))
        )
    )
  );

  @Effect({dispatch: false})
  createRoom$ = this.actions$.pipe(
    ofType(chatActions.createRoom),
    tap((payload) => this.chatService.createRoom(payload.name))
  );

  @Effect()
  renameRoom$ = this.actions$.pipe(
    ofType(chatActions.renameRoom),
    switchMap((data) => from(this.chatService.renameRoom(data.id, data.name)).pipe(
      map((payload) => chatActions.changeRoom({room: payload})),
      catchError(() => {
        alert('Permission denied');
        return EMPTY;
      }),
    )),
  );

  @Effect({dispatch: false})
  deleteRoom$ = this.actions$.pipe(
    ofType(chatActions.deleteRoom),
    tap((payload) => this.chatService.deleteRoom(payload.id)
      .catch(() => alert('Permission denied'))),
  );

  @Effect()
  changeRoom$ = this.actions$.pipe(
    ofType(chatActions.changeRoom),
    map((payload) => chatActions.changeRoomComplete({room: payload.room})),
  );

  @Effect()
  getMessages$ = this.actions$.pipe(
    ofType(chatActions.getMessages),
    switchMap(() =>
      this.chatService.getMessages.pipe(
        map((payload) => chatActions.getMessagesComplete({data: payload.data}))
      ))
  );

  @Effect()
  sendMessages$ = this.actions$.pipe(
    ofType(chatActions.sendMessage),
    switchMap((msg) =>
      from(this.chatService.sendMessage(msg.id, msg.text))
        .pipe(
          map((payload) => chatActions.sendMessageComplete({payload}))
        )),
  );

  @Effect({dispatch: false})
  editMessage$ = this.actions$.pipe(
    ofType(chatActions.editMessage),
    tap((payload) => this.chatService.renameMsg(payload.id, payload.text)
      .catch(() => alert('Permission denied'))),
  );

  @Effect({dispatch: false})
  processLikeMsg$ = this.actions$.pipe(
    ofType(chatActions.processLikeMsg),
    tap((payload) => this.chatService.processLikeMsg(payload.id)),
  );
}
