import {Injectable} from '@angular/core';

import * as feathersRx from 'feathers-reactive';
import * as io from 'socket.io-client';

import feathers, {Application} from '@feathersjs/feathers';
import feathersSocketIOClient from '@feathersjs/socketio-client';
// const feathersSocketIOClient = require('@feathersjs/socketio-client');
// const io = require('socket.io-client');

@Injectable({
  providedIn: 'root'
})
export class FeathersService {
  private ft: any = feathers();

  private socket = io('http://localhost:3030');
  private feathersAuthClient = require('@feathersjs/authentication-client').default;

  constructor() {
    this.ft
      .configure(feathersSocketIOClient(this.socket))
      .configure(this.feathersAuthClient({
        storage: window.localStorage
      }))
      .configure(feathersRx({                           // add feathers-reactive plugin
        idField: '_id'
      }));
  }

  public service(name: string): Promise<any> {
    return this.ft.service(name);
  }

  public authenticate(credentials?): Promise<any> {
    return this.ft.authenticate(credentials);
  }

  public logout(): Promise<any> {
    return this.ft.logout();
  }
}
