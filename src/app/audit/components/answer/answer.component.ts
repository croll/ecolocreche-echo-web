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
    this.infos = this.route.snapshot.data['infos'];
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
        if (this.node.type == 'directory') {
          this._getProgress(this.node);
        }
        return;
      }
    });
  }
  private _getProgress(node, root?) {
    if (node.childs && node.childs.length) {
      node.childs.forEach(child => {
        if (child.childs && child.childs.length) {
          this._getProgress(child, root || child);
        } else if (root) {
          root.numQuestions = (root.numQuestions) ? (root.numQuestions + 1) : 1;
          if (!root.numAnswers) root.numAnswers = 0;
          if (child.answer) {
            root.numAnswers++;
          }
          root.progress = Math.round(root.numAnswers * 100 / root.numQuestions);
        }
      });
    }
  }

  // private _getProgress(node, directParent = null, parents = []) {
  //   if (node.childs && node.childs.length) {
  //     node.childs.forEach(child => {
  //       if (child.childs && child.childs.length) {
  //         if (directParent) {
  //           parents.push(parents);
  //         }
  //         this._getProgress(child, node, parents);
  //       } else {
  //         // No child, it's a question
  //         console.log(child.title);
  //         console.log(parents);
  //         console.log('----');
  //       }
  //     });
  //   }
  // }

  private _getProgress2(node, id_node_grandParent = null) {
    if (node.childs && node.childs.length) {
      node.childs.forEach(child => {
        if (child.childs && child.childs.length) {
          this._getProgress2(child, child.id_node_parent);
        } else {
          // No child, it's a question
          console.log(child.title, child.id_node_parent, id_node_grandParent)
          console.log(child);
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
