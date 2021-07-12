import {IUser} from './user.model';

export interface IMessage {
  _id: string;
  userId: string;
  roomId: string;
  text: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  likes: string[];
}

