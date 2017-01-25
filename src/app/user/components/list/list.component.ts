import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { User } from '../../user';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  //providers: [ RestService ],
})
export class ListComponent implements OnInit {

  filter_string: string = "";
  rows: User[] = [];
  filtered_rows: User[] = [];
  errorMessage: string;

  columns = [
    { prop: 'name', name: "Nom" },
    { prop: 'email', name: "email" },
  ];

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.restService.getList()
                     .subscribe(
                       users => {
                         this.rows = this.filtered_rows = users;
                       },
                       error => {
                         this.errorMessage = <any>error;
                       });
  }

  updateFilter(searchstr) {
    this.filtered_rows = this.rows.filter((row) => {
      return !searchstr
      || row.name.toLowerCase().indexOf(searchstr) !== -1
      || row.email.toLowerCase().indexOf(searchstr) !== -1;
    })
  }


}
