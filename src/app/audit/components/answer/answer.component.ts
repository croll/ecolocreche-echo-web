import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../../inquiry-form/inquiry-form';
import { Node } from '../../../node/node';
import { RestService } from '../../../rest.service';
import * as moment from 'moment'

@Component({
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {

  private id_inquiryform: number;
  inquiryform: InquiryForm;
  inquiryformTree: Node[];
  parentNodes: any[] = [];
  filteredChildList: any[];
  hideUnselected: boolean;
  node: any;
  toggle: boolean = false;
  searchTerm:string = '';
  showSaveButton: boolean;
  initialSelection: string;
  userSelection: any;
  infos: any;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.node = new Node();
    this.infos = this.route.snapshot.data['infos']
    this.id_inquiryform = parseInt(this.route.snapshot.params['id']);
    this.inquiryform = new InquiryForm();
  }

  ngOnInit() {
    this.node = new Node();
    this.node.nodepath;
    this.node.childs = this.infos.nodes;
    this.filteredChildList = this.node.childs;
  }

  goToParent() {
    this.node = this.parentNodes.pop();
    this.filterList();
  }

  goToChild(id) {
    this.parentNodes.push(this.node);
    this._goToNode(id);
  }

  private _goToNode(id) {
    let selection;
    this.node.childs.forEach(child => {
      if (child.id_node == id) {
        this.node = child;
        this.filterList();
        return;
      }
    });
  }

  filterList(filter?) {
    if (!filter) {
      this.searchTerm = '';
    }
    this.filteredChildList = filter ? this.node.childs.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.node.childs;
  }

  save() {
    console.log("TODO: SAVE !");
  }

}
