import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //providers: [ RestService ],
})
export class LoginComponent implements OnInit {

  model = {
    name: "",
    password: ""
  }

  constructor(private restService: RestService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("login: ", this.model);
    this.restService.login(this.model.name, this.model.password)
    .subscribe(user => {
      console.log("user: ", user);
      this.router.navigate(["/"]);
    }, err => {
      console.log("err: ", err);
    })
  }

}
