import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { LoginRequest } from './types';
import { User } from './user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();
  currentUser: User | null = null;

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  user: User | null;
  uri = "https://angularmiage-u4il.onrender.com/api/auth";

  loggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {
    this._isLoggedIn$.next(!!this.tokenService.getToken());
    this.user = this.getUser(this.tokenService.getToken());
    this._user.next(this.getUser(this.tokenService.getToken()));
    this.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  get userObservable(): Observable<User | null> {
    return this.user$;
  }


  signupUser(first_name: string, last_name: string, email: string, password: string): Observable<any> {
    const queryParams = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    }
    return this.http.post<any>(`${this.uri}/register`, queryParams, this.httpOptions);
  }

  get firstNameGetter(): string {
    return this.user?.first_name || '';
  }

  logIn(queryParams: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.uri}/login`, queryParams, this.httpOptions).pipe(
      tap((res: any) => {
        this._isLoggedIn$.next(true);
        this.tokenService.saveToken(res.access_token,86400); // Sauvegarde le token si ce n'est pas déjà fait
        this._user.next(this.getUser(res.access_token));
      })
    );
  }

  private getUser(token: string | null): User | null {
    if (!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }

  logOut(){
    this.tokenService.logout();
    return this.http.post<any>(`${this.uri}/logout`, this.httpOptions).pipe(
      tap((res: any) => {
        this._isLoggedIn$.next(false);
      })
    );
  }

  // renvoie une promesse qui est résolue si l'utilisateur est loggué
  isAdmin(user: User){
    const isUserAdmin = new Promise<boolean>(
      (resolve, reject) => {
        resolve(user.role === 'admin');
      }
    );
    return isUserAdmin;
  }

  isLogged(){
    const isLogged = new Promise<boolean>(
      (resolve, reject) => {
        resolve(this.loggedIn);
      }
    );
    return isLogged;
  }
}
