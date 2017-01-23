import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../user';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ UserService ],
})
export class ListComponent implements OnInit {

  rows: User[];
  errorMessage: string;

  columns = [
    { prop: 'name', name: "Nom" },
    { prop: 'email', name: "email" },
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.userService.getList()
                     .subscribe(
                       users => {
                         this.rows = users;
                       },
                       error => {
                         this.errorMessage = <any>error;
                       });
  }

}
