import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
        ).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
       return this.http.post<AuthResponseData>(
           'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCjrXVAPdtyXt86JKnpNTj8xdCP-zrY708',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
       ).pipe(catchError(this.handleError));
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
