import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.css']
})
export class LostPasswordComponent implements OnInit {

  model = {
    name: "",
  }

  constructor(private restService: RestService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.restService.lostpassword(this.model.name)
    .subscribe(res => {
      if (res) {
        this.snackBar.open("Récupération du mot de passe : ", "Ok, consultez votre boite mail", {
              duration: 3000,
            });
            this.router.navigate(["/"]);
      } else {
        this.snackBar.open("Récupération du mot de passe : ", "ERREUR !", {
              duration: 6000,
            });
      }
    }, err => {
      this.snackBar.open("Récupération du mot de passe : ", "ERREUR !", {
            duration: 6000,
          });
    })
    return false;
  }

}
