import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { of } from 'rxjs';
import { readPatchedData } from '@angular/core/src/render3/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.fireBaseAPIKey,
                 {
                     email: authData.payload.email,
                     password: authData.payload.password,
                     returnSecureToken: true
                 }
            ).pipe(
                 map(resData => {
                    const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
                    return new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate
                    });
                }),
                catchError(error => {
                    return of();
                })
            );
        }),

    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {

    }
}
