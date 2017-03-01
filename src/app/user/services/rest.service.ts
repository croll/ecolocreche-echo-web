import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { AuthService } from '../../auth.service';
import { RestService as MainRestService } from '../../rest.service';

import { User } from '../user';


@Injectable()
export class RestService {
  private restUrl = 'rest/users';  // URL to web API

  constructor(private http: Http, private authService: AuthService, private mainRestService: MainRestService) {
  }

  getList (): Observable<User[]> {
    return this.mainRestService.getList('users');
  }

  get(id: number): Observable<User> {
    return this.mainRestService.get(id, 'users');
  }

  save(obj): Observable<User> {
    return this.mainRestService.save(obj, 'users', undefined, 'id', "Sauvegarde de l'utilisateur : ");
  }

  delete(id): Observable<boolean> {
    return this.mainRestService.delete(id, 'users', "Suppression de l'utilisateur : ");
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
    let luser: User = null;
    if (user && user.user && user.user.id) {
        luser = new User();
        Object.assign(luser, user['user']);
    }
    this.authService.setUser(luser);
    return luser;
  }

  private handleLogout() {
    this.authService.setUser(null);
    return null;
  }

  public whoami() {
    return this.http.get('rest/whoami')
    .map(this.extractData)
    .map((user) => { return this.handleLogin(user); })
    .catch(this.handleError);
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post('rest/login', {
      username: username,
      password: password,
    })
    .map(this.extractData)
    .map((user) => { return this.handleLogin(user); })
    .catch(this.handleError);
  }

  public logout(): Observable<User> {
    return this.http.post('rest/logout', {
    })
    .map(this.extractData)
    .map(() => { return this.handleLogout(); })
    .catch(this.handleError);
  }

  lostpassword(username: string): Observable<User> {
    console.log("youhou ?");
    return this.http.post('rest/lostpassword', {
      username: username,
    })
    .map(this.extractData)
    .catch(this.handleError);
  }

}
