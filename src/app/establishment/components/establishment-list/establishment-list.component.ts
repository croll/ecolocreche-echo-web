import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from '../../services/establishment.service';
import { Establishment } from '../../establishment';

@Component({
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss']
})
export class EstablishmentListComponent implements OnInit {

  list: Establishment[] = [];
  errorMessage: string;

  constructor(private establishmentService: EstablishmentService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.establishmentService.getList().subscribe(
      establishments => {
       this.list = establishments;
       console.log(this.list);
     },
     error => {
       this.errorMessage = <any>error;
     });
  }

}
