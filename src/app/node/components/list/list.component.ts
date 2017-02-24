import { Component, OnInit, HostBinding } from '@angular/core';
import { RestService } from '../../../rest.service';
import { Node } from '../../node';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // animations: [ slideInDownAnimation ]
})
export class ListComponent implements OnInit {

  list: Node[] = [];
  filteredList: Node[] = [];
  errorMessage: string;
  showSaveButton: boolean;

  // @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.restService.getList('hist/nodes?recurse=1').subscribe(
     nodes => {
       this.list = nodes;
       this.filteredList = this.list;
     },
     error => {
       this.errorMessage = <any>error;
     });
  }

  filterList(filter) {
    this.filteredList = filter ? this.list.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.list;
  }

  swap(num1, num2) {
    let tmp = this.list[num2];
    this.list[num2] = this.list[num1];
    this.list[num1] = tmp;
    this.showSaveButton = true;
    return false;
  }

  save() {
    for (var i in this.list) {
      let new_position = parseInt(i);
      if (this.list[i].position != new_position) {
        this.list[i].position = new_position;
        this.restService.save(this.list[i], 'hist/nodes', {}, 'id_node').subscribe(() => {
        });
      }

    }
    this.showSaveButton = false;
  }

}
