import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IUser} from '../models/data/IUser';
import {User} from '../models/User';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Config} from '../config';
import {INameAndID} from '../models/data/INameAndID';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserSessionManagerService {
  public isSigned: Observable<boolean>;
  private currentIsSigned: BehaviorSubject<boolean>;

  public userSession: Observable<User>;
  private currentUserSession: BehaviorSubject<User>;

  constructor(private client: HttpClient, private router: Router) {
    this.currentIsSigned = new BehaviorSubject<boolean>(false);
    this.currentUserSession = new BehaviorSubject<User>(null);

    this.isSigned = this.currentIsSigned.asObservable();
    this.userSession = this.currentUserSession.asObservable();

    const currUser = localStorage.getItem('currentUser');

    if (currUser === null) {
      return;
    }

    this.currentIsSigned.next(true);
    this.currentUserSession.next(JSON.parse(currUser));
  }

  login(username: string, password: string): Observable<boolean> {
    return this.client.post<any>(`${Config.backendURL}/auth`, {username, password})
      .pipe(map(data => {
          if ('jwt' in data){
            const u = new User();
            u.username = username;
            u.token = data.jwt;
            u.id = data.id;

            this.currentUserSession.next(u);
            localStorage.setItem('currentUser', JSON.stringify(this.currentUserSession.value));
            this.currentIsSigned.next(true);

            return true;
          }

          return false;
        })
      );
  }

  logout(): void {
    this.currentUserSession.next(null);
    this.currentIsSigned.next(false);
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/');
  }

  get token(): string {
    if ( this.currentUserSession.value !== null) {
      return this.currentUserSession.value.token;
    }
    return '';
  }

  get signed(): boolean {
    return this.currentIsSigned.value;
  }

  get username(): string {
    return this.currentUserSession.value.username;
  }

  get id(): number {
    return this.currentUserSession.value.id;
  }
}
