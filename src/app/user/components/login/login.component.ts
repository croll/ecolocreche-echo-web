import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("login: ", this.model);
    this.userService.login(this.model.name, this.model.password)
    .subscribe(user => {
      console.log("user: ", user);
    }, err => {
      console.log("err: ", err);
    })
  }

}
