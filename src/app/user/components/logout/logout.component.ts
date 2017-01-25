import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  //providers: [ RestService ],
})
export class LogoutComponent implements OnInit {

  constructor(private restService: RestService, private router: Router) { }

  ngOnInit() {
    this.restService.logout()
    .subscribe(user => {
      console.log("user: ", user);
      this.router.navigate(["/connexion"]);
    }, err => {
      console.log("err: ", err);
      this.router.navigate(["/"]);
    })
  }

}
