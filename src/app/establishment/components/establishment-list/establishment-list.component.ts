import { Component, OnInit, HostBinding } from '@angular/core';
import { EstablishmentService } from '../../services/establishment.service';
import { Establishment } from '../../establishment';
// import { slideInDownAnimation } from '../../../animations';

@Component({
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss'],
  // animations: [ slideInDownAnimation ]
})
export class EstablishmentListComponent implements OnInit {

  list: Establishment[] = [];
  filteredList: Establishment[] = [];
  errorMessage: string;

  // @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  constructor(private establishmentService: EstablishmentService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.establishmentService.getList().subscribe(
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
