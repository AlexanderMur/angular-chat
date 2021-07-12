import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IMessage} from '../components/chat/model/message.model';
import {FeathersService} from './feathers.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private feathers: FeathersService) {
  }

  get getRooms(): Observable<any> {
    return (this.feathers.service('rooms') as any)
      .watch().find({
        query: {
          $sort: {createdAt: -1},
        }
      });
  }

  get getMessages(): Observable<any> {
    return (this.feathers.service('messages') as any)
      .watch().find({
        query: {
          $sort: {createdAt: -1},
          $limit: 50
        }
      });
  }

  createRoom(name: string): void {
    if (name === '') {
      return;
    }

    (this.feathers.service('rooms') as any)
      .create({
        name,
      });
  }

  renameRoom(id: string, name: string): Promise<any> {
    return (this.feathers.service('rooms') as any).update(id, {
      name
    });
  }

  deleteRoom(id: string): Promise<any> {
    return (this.feathers.service('rooms') as any).remove(id);
  }

  renameMsg(id: string, text: string): Promise<any> {
    if (text === '') {
      return;
    }
    return (this.feathers.service('messages') as any).patch(id, {action: 'rename', text});
  }

  sendMessage(id: string, text: string): Promise<IMessage> {
    if (text === '') {
      return;
    }

    return (this.feathers.service('messages') as any)
      .create({
        id,
        text
      });
  }

  processLikeMsg(id: any): Promise<any> {
    return (this.feathers.service('messages') as any)
      .patch(id, {});
  }
}
