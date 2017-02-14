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
    this.infos = this.route.snapshot.data['infos']
    this.id_inquiryform = parseInt(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.node = this.infos.nodes;
    this.filteredChildList = this.node.childs;
    this._getProgress(this.node);
  }

  goToParent() {
    this.node = this.parentNodes.pop();
    this.filterList();
    this._getProgress(this.node);
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
        this._getProgress(this.node);
        return;
      }
    });
  }

  private _getProgress(node, parents = []) {
    if (node.childs && node.childs.length) {
      node.childs.forEach(child => {
        if (child.childs && child.childs.length) {
          this._getProgress(child, parents);
          // No child, it's a question
        } else {
          console.log(child.title)
        }
      });
    }
  }

  filterList(filter?) {
    if (!filter) {
      this.searchTerm = '';
    }
    this.filteredChildList = filter ? this.node.childs.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.node.childs;
  }

}
