import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ],
})
export class LoginComponent implements OnInit {

  model = {
    name: "",
    password: ""
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("login: ", this.model);
    this.userService.login(this.model.name, this.model.password)
    .subscribe(user => {
      console.log("user: ", user);
      this.router.navigate(["/"]);
    }, err => {
      console.log("err: ", err);
    })
  }

}
