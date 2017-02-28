import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ RestService ],
})
export class LoginComponent implements OnInit {

  model = {
    name: "",
    password: ""
  }

  constructor(private restService: RestService, private router: Router, private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("login: ", this.model);
    this.restService.login(this.model.name, this.model.password)
    .subscribe(user => {
      if (user) {
        this.snackBar.open("Bienvenue, "+user.name, "", {
              duration: 3000,
            });
            this.router.navigate(["/"]);
      } else {
        this.snackBar.open("Authentification impossible", "ERREUR !", {
              duration: 6000,
            });
      }
    }, err => {
      this.snackBar.open("Authentification impossible", "ERREUR !", {
            duration: 6000,
          });
    })
  }

}
