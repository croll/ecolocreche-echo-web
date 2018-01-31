import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../../common/models/inquiry-form';
import { Node } from '../../../common/models/node';
import { RestService } from '../../../rest.service';
import { AuthService } from '../../../auth.service';
import * as moment from 'moment'


@Component({
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {

  parentNodes: any[] = [];
  filteredChildList: any[];
  node: any;
  toggle: boolean = false;
  searchTerm:string = '';
  showSaveButton: boolean;
  infos: any;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, public authService: AuthService) {
    this.infos = this.route.snapshot.data['infos'][0];
    console.log(this.infos);
  }

  ngOnInit() {
    this.node = this.infos.nodes;
    this.filteredChildList = this.node.childs;
  }

  filterList(filter?) {
    if (!filter) {
      this.searchTerm = '';
    }
    this.filteredChildList = filter ? this.node.childs.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.node.childs;
  }

}
