import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  providers: [ RestService ],
})
export class LogoutComponent implements OnInit {

  constructor(private restService: RestService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.restService.logout()
    .subscribe(user => {
      if (!user) {
        this.snackBar.open("Déconnection : ", "déconnecté", {
              duration: 6000,
            });
      } else {
        this.snackBar.open("Déconnection : ", "ca n'a pas marché !", {
              duration: 6000,
            });
      }
    }, err => {
      this.snackBar.open("Déconnection : ", "ca n'a pas marché !", {
            duration: 6000,
          });
      console.log("err: ", err);
    })
    this.router.navigate(["/connexion"]);
  }

}
