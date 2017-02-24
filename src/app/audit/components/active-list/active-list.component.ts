import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../../rest.service';
import { Audit } from '../../audit';

@Component({
  templateUrl: './active-list.component.html',
  styleUrls: ['./active-list.component.scss'],
})
export class ActiveListComponent implements OnInit {

  list: any[] = [];
  filteredList: any[] = [];
  errorMessage: string;

  constructor(private restService: RestService, private route: ActivatedRoute) {
    this.list = this.route.snapshot.data['infos'];
    this.filteredList = this.list;
  }

  ngOnInit() {
  }

  filterList(filter) {
    this.filteredList = filter ? this.list.filter(item => item.establishment.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.list;
  }

}
