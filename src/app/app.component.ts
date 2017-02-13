import { Component, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { RestService as UserRestService} from './user/services/rest.service';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ UserRestService ],
})
export class AppComponent{

  processProgressPercent = 0;

  loggedUser: User = null;

  constructor(private authService: AuthService, private userRestService: UserRestService) {
    this.userRestService.whoami().subscribe((user) => {
    });
    this.authService.loggedUserObs.subscribe(user => {
      this.loggedUser = user;
      console.log("actual user is: ", user);
    });
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
