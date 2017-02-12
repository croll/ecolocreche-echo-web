import { Injectable } from '@angular/core';

import { User } from 'app/user/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


@Injectable()
export class AuthService {

  public loggedUser: User;
  public loggedUserObs = new BehaviorSubject<User>(null);

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  public setUser(user: User) {
    this.loggedUser=user;
    this.loggedUserObs.next(user);
  }

  public get isLoggedIn(): boolean {
    return this.loggedUser != null;
  }

  isAdmin() {
    return this.loggedUser != null && this.loggedUser.account_type == 'admin';
  }

  isSuperAgent() {
    return this.loggedUser != null
      && (this.loggedUser.account_type == 'admin'
      || this.loggedUser.account_type == 'superagent');
  }

  isAgent() {
    return this.loggedUser != null
      && (this.loggedUser.account_type == 'admin'
      || this.loggedUser.account_type == 'superagent'
      || this.loggedUser.account_type == 'agent');
  }

  isNotLogged() {
    return this.loggedUser == null;
  }

}
