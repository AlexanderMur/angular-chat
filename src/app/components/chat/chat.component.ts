import {Component, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {IMessage} from './model/message.model';
import {Store} from '@ngrx/store';
import {IRoom} from './model/room.model';
import {
  changeRoom,
  getMessages,
  getRooms,
  processLikeMsg,
  selectCurrentRoom,
  selectLastMessage,
  selectMessages,
  selectRooms,
  sendMessage
} from '../../store/chat';
import {IUser} from './model/user.model';
import {selectUserInfo} from '../../store/auth';
import {map} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OverlayScrollbarsComponent} from 'overlayscrollbars-ngx';
import {ModalContainerComponent} from '../modal-container/modal-container.component';
import {ModalAction, ModalDataModel} from '../modal-container/modal-data.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  currentRoom: IRoom;
  userInfo: IUser;
  modalAction = ModalAction;
  roomsShow = false;

  userInfo$: Observable<IUser>;
  messages$: Observable<IMessage[]>;
  rooms$: Observable<IRoom[]>;
  currentRoom$: Observable<IRoom>;
  messageCurrentRoom$: Observable<IMessage[]>;

  @ViewChild('scrollMessages', {read: OverlayScrollbarsComponent})
  scrollMessages: OverlayScrollbarsComponent;

  constructor(private store: Store, private modalService: NgbModal) {
  }

  ngOnInit(): void {

    this.store.dispatch(getMessages());
    this.store.dispatch(getRooms());

    this.userInfo$ = this.store.select(selectUserInfo);
    this.messages$ = this.store.select(selectMessages).pipe(
      map((m: any[]) => [...m].reverse()),
    );
    this.rooms$ = this.store.select(selectRooms);
    this.currentRoom$ = this.store.select(selectCurrentRoom);

    this.store.select(selectLastMessage).subscribe(() => this.onMessageSend());

    this.messageCurrentRoom$ = combineLatest([this.messages$, this.currentRoom$]).pipe(
      map(([messages, currId]) => messages?.filter((message) => message.roomId === currId?._id))
    );

    this.currentRoom$.subscribe((room) => this.currentRoom = room);
    this.userInfo$.subscribe((user) => this.userInfo = user);
  }

  openModal(payload: ModalDataModel): void {
    const modalRef = this.modalService.open(ModalContainerComponent, {centered: true});

    modalRef.componentInstance.fromParent = {
      action: payload.action,
      id: payload.id,
      value: payload.value,
    };
  }

  deleteMessage(message: IMessage): void {
    if (this.userInfo._id !== message.userId) {
      return;
    }
    this.openModal({action: this.modalAction.UPDATEMSG, id: message._id, value: message.text});
  }

  sendMessage(roomId: string, value: string): void {
    this.store.dispatch(sendMessage({id: roomId, text: value}));
  }

  onChangeRoom(room: IRoom): void {
    this.store.dispatch(changeRoom({room}));
  }

  addLike(messageId: string): void {
    this.store.dispatch(processLikeMsg({id: messageId}));
  }

  onMessageSend(): void {
    if (this.scrollMessages) {
      setTimeout(() => {
        this.scrollMessages.osInstance().scrollStop().scroll({y: '100%'}, 100);
      });
    }
  }

  isLikedByUser(message: IMessage, userInfo: IUser): boolean {
    return message.likes.includes(userInfo._id);
  }

  toggleRooms(): void {
    this.roomsShow = !this.roomsShow;
  }
}
