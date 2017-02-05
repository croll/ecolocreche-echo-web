import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { AuthService } from '../../auth.service';

import { User } from '../user';

@Injectable()
export class RestService {
  private restUrl = 'rest/users';  // URL to web API

  constructor(private http: Http, private authService: AuthService) {
  }

  getList (): Observable<User[]> {
    return this.http.get(this.restUrl)
                    .map((res: Response) => { return this.extractData(res) })
                    .catch(this.handleError);
  }

  get(id: number): Observable<User> {
    return this.http.get(`rest/users/${id}`)
                    .map((res: Response) => { return this.extractData(res) })
                    .catch(this.handleError);
  }

  save(obj): Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    if (obj.id) {
      return this.http.put(`rest/users/${obj.id}`, JSON.stringify(obj), options)
              .map((res: Response) => { return this.extractData(res) })
              .catch(this.handleError);
    } else {
      return this.http.post('rest/users', JSON.stringify(obj), options)
              .map((res: Response) => { return this.extractData(res) })
              .catch(this.handleError);
    }
  }

  delete(id): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    if (!id) {
      return;
    }

    return this.http.delete(`rest/users/${id}`, options)
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

}
