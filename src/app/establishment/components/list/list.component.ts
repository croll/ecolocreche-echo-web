import { Component, OnInit, HostBinding } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Establishment } from '../../establishment';
// import { slideInDownAnimation } from '../../../animations';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // animations: [ slideInDownAnimation ]
})
export class ListComponent implements OnInit {

  list: Establishment[] = [];
  filteredList: Establishment[] = [];
  errorMessage: string;

  // @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.restService.getList().subscribe(
      establishments => {
       this.list = establishments;
       this.filteredList = this.list;
     },
     error => {
       this.errorMessage = <any>error;
     });
  }

  filterList(filter) {
    this.filteredList = filter ? this.list.filter(item => item.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.list;
  }

}
