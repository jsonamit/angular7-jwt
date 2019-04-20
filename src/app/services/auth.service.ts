import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userTokenSubject: BehaviorSubject<any>;
    public userToken: Observable<any>;

    constructor(private http: HttpClient) {
        this.userTokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('userToken')));
        this.userToken = this.userTokenSubject.asObservable();
    }

    public get userTokenValue(){
        return this.userTokenSubject.value;
    }

    login(email: string, password: string) {
        let apiUrl = `${environment.baseUrl}`;
		return this.http.post<any>(`${apiUrl}login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('userToken', JSON.stringify(user));
                    this.userTokenSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('userToken');
        this.userTokenSubject.next(null);
    }
}