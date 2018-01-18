import { Component, OnInit, HostBinding } from '@angular/core';
import { RestService } from '../../../rest.service';
import { RecapActions } from '../../recap-actions';
import { AuthService } from '../../../auth.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  list: RecapActions[] = [];
  filteredList: RecapActions[] = [];
  errorMessage: string;

  constructor(private restService: RestService, public authService: AuthService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.restService.getList('hist/recap_actions').subscribe(
      info => {
       this.list = info;
       this.filteredList = info;
     },
     error => {
       this.errorMessage = <any>error;
     });
  }

  filterList(filter) {
    this.filteredList = filter ? this.list.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.list;
  }

}
