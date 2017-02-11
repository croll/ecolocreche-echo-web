import { Component, OnInit, HostBinding } from '@angular/core';
import { RestService } from '../../../rest.service';
import { Audit } from '../../audit';

@Component({
  templateUrl: './active-list.component.html',
  styleUrls: ['./active-list.component.scss'],
})
export class ActiveListComponent implements OnInit {

  list: Audit[] = [];
  filteredList: Audit[] = [];
  errorMessage: string;

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.restService.getList('audits', {active: true}).subscribe(
      audits => {
       this.list = audits;
       this.filteredList = this.list;
     },
     error => {
       this.errorMessage = <any>error;
     });
  }

  filterList(filter) {
    // this.filteredList = filter ? this.list.filter(item => item.establishment.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.list;
  }

}
