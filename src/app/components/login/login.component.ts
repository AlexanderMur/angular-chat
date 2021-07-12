import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {login} from '../../store/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  nameControl: FormControl = new FormControl();
  passwordControl: FormControl = new FormControl();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.store.dispatch(login({email: this.nameControl.value, password: this.passwordControl.value}));
  }
}
