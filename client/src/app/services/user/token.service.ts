import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token = null;

  constructor() {
    this.getAuthTokenStorage();
  }

  public getAuthTokenStorage() {
    this.token = localStorage.getItem('token');
  }

  /**
   * set the token parameter of user connected
   * @param token - string
   */
  public setAuthToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  /**
   * get Token crypted
   */
  public getToken() {
    return this.token;
  }

  /**
   * remove token
   */
  public clearAuthToken() {
    this.token = null;
    localStorage.clear();
  }

  /**
   * check if token is expired
   */
  public isTokenNotExpired(): boolean {
    return !helper.isTokenExpired(this.token);
  }

  /**
   * get id user in token
   */
  public idUserToken() {
    return helper.decodeToken(this.token);
  }
}
