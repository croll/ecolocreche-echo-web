import { Component, OnInit, HostBinding } from '@angular/core';
import { RestService } from '../../../rest.service';
import { Establishment } from '../../establishment';
// import { slideInDownAnimation } from '../../../animations';
import { AuthService } from '../../../auth.service';

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

  constructor(private restService: RestService, public authService: AuthService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.restService.getList('establishments').subscribe(
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
