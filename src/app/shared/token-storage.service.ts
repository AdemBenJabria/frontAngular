import { Injectable } from "@angular/core";
import * as moment from "moment";

const AUTH_TOKEN = 'auth-token';
const AUTH_USER = 'auth-user';
const EXPIRES_AT = 'auth-expiresAt'

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() { }

    getToken(): string | null {
        return localStorage.getItem(AUTH_TOKEN);
    }

    saveToken(token: string, expiresIn: number): void {
        const expiresAt = moment().add(expiresIn, 'second');
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.setItem(AUTH_TOKEN, token);
        localStorage.setItem(EXPIRES_AT, expiresAt.valueOf().toString());
    }

    getUser(): any {
        const user = localStorage.getItem(AUTH_USER);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }

    saveUser(user: any): void {
        localStorage.removeItem(AUTH_USER);
        localStorage.setItem(AUTH_USER, JSON.stringify(user));
    }

    isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    logout(): void {
        localStorage.clear();
    }

    getExpiration() {
        const expiration = localStorage.getItem(EXPIRES_AT)!;
        return moment(JSON.parse(expiration));
    }
}