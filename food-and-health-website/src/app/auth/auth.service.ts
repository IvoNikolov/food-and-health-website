import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expireIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new Subject<User>();

    constructor(private http: HttpClient) {

    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCjrXVAPdtyXt86JKnpNTj8xdCP-zrY708',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expireIn);
        }));
    }

    login(email: string, password: string) {
       return this.http.post<AuthResponseData>(
           'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCjrXVAPdtyXt86JKnpNTj8xdCP-zrY708',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
       ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expireIn);
       }));
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

    private handleError( errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        } else {
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS' :
                    errorMessage = 'This email already exists!';
                    break;
                case 'EMAIL_NOT_FOUND' :
                    errorMessage = 'This email does not exists!';
                    break;
                case 'INVALID_PASSWORD' :
                    errorMessage = 'This password is not correct!';
                    break;
            }
            return throwError(errorMessage);
        }
    }
}
