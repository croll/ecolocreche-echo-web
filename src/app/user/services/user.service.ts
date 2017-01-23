import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { User } from '../user';

@Injectable()
export class UserService {
  private restUrl = 'rest/users';  // URL to web API
  public loggedUser: User = null;

  constructor(private http: Http) { }

  getList (): Observable<User[]> {
    return this.http.get(this.restUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private handleLogin(user: any) {
    this.loggedUser = user['user'];
    return this.loggedUser;
  }

  private handleLogout() {
    this.loggedUser = null;
    return null;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post('rest/login', {
      username: username,
      password: password,
    })
    .map(this.extractData)
    .map(this.handleLogin)
    .catch(this.handleError);
  }

  public logout(): Observable<User> {
    return this.http.post('rest/logout', {
    })
    .map(this.extractData)
    .map(this.handleLogout)
    .catch(this.handleError);
  }

  public get isLogged() {
    return this.loggedUser && this.loggedUser.id > 0;
  }

}
