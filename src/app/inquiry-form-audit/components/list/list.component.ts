import { Component, OnInit, HostBinding } from '@angular/core';
import { RestService } from '../../../rest.service';
import { InquiryForm } from '../../../common/models/inquiry-form';
import { AuthService } from '../../../auth.service';
// import { slideInDownAnimation } from '../../../animations';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // animations: [ slideInDownAnimation ]
})
export class ListComponent implements OnInit {

  list: InquiryForm[] = [];
  filteredList: InquiryForm[] = [];
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
    this.restService.getList('hist/inquiryforms', {inquiry_type: InquiryForm.Inquiry_type.Audit}).subscribe(
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
