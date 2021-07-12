import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as authActions from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, from, of} from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  @Effect()
  login$ = this.actions$.pipe(
    ofType(authActions.login),
    switchMap((payload) =>
      from(this.authService.doLogin({strategy: 'local', ...payload}))
        .pipe(map(() => authActions.checkAuth()),
          catchError(() => {
            alert('Authorize error');
            return EMPTY;
          }))
    )
  );

  @Effect()
  checkAuth$ = this.actions$.pipe(
    ofType(authActions.checkAuth),
    switchMap(() =>
      from(this.authService.isLoggedIn)
        .pipe(
          map((isLoggedIn) => authActions.checkAuthComplete({isLoggedIn})),
          catchError(() => of(authActions.checkAuthComplete({isLoggedIn: false})))
        )
    )
  );

  @Effect()
  checkAuthComplete$ = this.actions$.pipe(
    ofType(authActions.checkAuthComplete),
    switchMap(({isLoggedIn}) => {
      if (isLoggedIn) {
        return from(this.authService.userData).pipe(
          map((profile) =>
            authActions.loginComplete({profile, isLoggedIn})
          )
        );
      }
      return of(authActions.logoutComplete());
    })
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(authActions.logout),
    switchMap(() => from(this.authService.doSignOut()).pipe(
      map(() => authActions.logoutComplete())
    )),
  );

  @Effect({dispatch: false})
  logoutComplete$ = this.actions$.pipe(
    ofType(authActions.logoutComplete),
    tap(() => this.router.navigate(['/login']))
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType(authActions.signUp),
    switchMap((credentials) =>
      from(this.authService.doSignUp(credentials))
        .pipe(
          map((profile) => authActions.login(credentials)),
          catchError(() => {
            alert('Error');
            return EMPTY;
          })
        )
    )
  );

}
