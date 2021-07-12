import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Store} from '@ngrx/store';
import {signUp} from '../../store/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
  nameControl: FormControl = new FormControl();
  emailControl: FormControl = new FormControl();
  passwordControl: FormControl = new FormControl();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  register(): void {
    this.store.dispatch(signUp({email: this.emailControl.value, password: this.passwordControl.value, name: this.nameControl.value}));
  }
}
