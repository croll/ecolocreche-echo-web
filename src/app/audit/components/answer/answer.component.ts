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
  hideUnselected: boolean;
  node: any;
  toggle: boolean = false;
  searchTerm:string = '';
  showSaveButton: boolean;
  initialSelection: string;
  userSelection: any;
  infos: any;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, public authService: AuthService) {
    this.infos = this.route.snapshot.data['infos'];
  }

  ngOnInit() {
    this.node = this.infos.nodes;
    this.filteredChildList = this.node.childs;
    this._getProgress(this.node);
  }

  goToParent(num = 1) {
    for(let i = 0; i < num; i++) {
      this.node = this.parentNodes.pop();
    }
    this.filterList();
    this._getProgress(this.node);
  }

  goToRoot() {
    if (!this.parentNodes.length) {
      return;
    }
    this.node = this.parentNodes[0];
    this.parentNodes = [];
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
        if (this.node.type == 'directory') {
          this._getProgress(this.node);
        }
        return;
      }
    });
  }

  private _getProgress(dir) {
    var r = {
    question_count: 0,
    answer_count: 0,
    };
      dir.childs.forEach((row) => {
         if (row.type.startsWith('q_')) {
             r.question_count++;
             if (row.answer) {
                 r.answer_count++;
             }
          }
          else if (row.type == 'directory') {
              var _r = this._getProgress(row);
              r.question_count += _r.question_count;
              r.answer_count += _r.answer_count;
          }
      });
    dir.progress = Math.round(r.answer_count * 100 / r.question_count);
    return r;

  }

  filterList(filter?) {
    if (!filter) {
      this.searchTerm = '';
    }
    this.filteredChildList = filter ? this.node.childs.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.node.childs;
  }

}
