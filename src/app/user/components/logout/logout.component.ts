import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  providers: [ UserService ],
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.logout()
    .subscribe(user => {
      console.log("user: ", user);
      this.router.navigate(["/connexion"]);
    }, err => {
      console.log("err: ", err);
      this.router.navigate(["/"]);
    })
  }

}
