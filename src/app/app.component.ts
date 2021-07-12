import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectIsAuthenticated, selectUserInfo} from './store/auth';
import {checkAuth, logout} from './store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chatroom';
  isAuthenticated$: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(checkAuth());
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  logOut(): void {
    this.store.dispatch(logout());
  }
}
