import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { RestService as UserRestService} from './user/services/rest.service';
import { User } from './user/user';
import 'intl';
import 'intl/locale-data/jsonp/en';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ UserRestService ],
})
export class AppComponent implements OnInit {

  processProgressPercent = 0;

  loggedUser: User = null;
  menuVisibility: boolean;


  constructor(private authService: AuthService, private userRestService: UserRestService) {
    this.userRestService.whoami().subscribe((user) => {
    });
    this.authService.loggedUserObs.subscribe(user => {
      this.loggedUser = user;
      console.log("actual user is: ", user);
    });
  }

  ngOnInit() {
    this.menuVisibility = (window.innerWidth <= 960) ? false : true;
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

  menuHide(e, force = false) {
    e.preventDefault();
    e.stopPropagation();
    if (window.innerWidth <= 960 || force) {
      this.menuVisibility = false;
    }
  }

  toggleMenu() {
    this.menuVisibility = !this.menuVisibility;
  }

}
