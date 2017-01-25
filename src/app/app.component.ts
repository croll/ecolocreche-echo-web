import { Component, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestService as UserRestService } from './user/services/rest.service';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ UserRestService ],
})
export class AppComponent{
  processProgressPercent = 0;

  loggedUser: User = null;

  constructor(private userRestService: UserRestService) {
    this.userRestService.loggedUserObs.subscribe(user => {
      this.loggedUser = user;
      console.log("actual user is: ", user);
    });
  }

}
