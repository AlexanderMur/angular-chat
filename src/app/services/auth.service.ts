import {Injectable} from '@angular/core';
import {FeathersService} from './feathers.service';
import {Router} from '@angular/router';
import {IUser} from '../components/chat/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private feathers: FeathersService, private router: Router) {
  }

  get userData(): Promise<IUser> {
    return this.feathers.authenticate()
      .then((credentials) => credentials.user)
      .catch(() => null);
  }

  get isLoggedIn(): Promise<boolean> {
    return this.feathers.authenticate()
      .then(() => true)
      .catch(() => false);
  }

  doLogin(credentials?): Promise<boolean> {
    return this.feathers.authenticate(credentials)
      .then(() => this.router.navigate(['/']));
  }

  doSignUp(credentials): Promise<IUser> {
    return (this.feathers.service('users') as any)
      .create(credentials).then(() => true);
  }

  doSignOut(): Promise<any> {
    return this.feathers.logout();
  }
}
