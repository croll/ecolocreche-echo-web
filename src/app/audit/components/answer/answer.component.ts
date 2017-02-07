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
    this.infos = this.route.snapshot.data['audit']
    console.log(this.infos);
    this.id_inquiryform = parseInt(this.route.snapshot.params['id']);
    this.inquiryform = new InquiryForm();
  }

  ngOnInit() {
    this.restService.get(this.id_inquiryform, 'hist/inquiryforms').subscribe(info => {
      this.inquiryform = info;
      this.node = new Node();
      this.node.childs = this.route.snapshot.data['inquiryFormTree']
      this.filteredChildList = this.node.childs;
      this.initialSelection = this.inquiryform.nodeslist;
      this.userSelection = (this.inquiryform.nodeslist) ? JSON.parse(this.inquiryform.nodeslist) : [];
      this._checkSelection();
    });
  }

  goToParent() {
    this.node = this.parentNodes.pop();
    this.filterList();
    this._checkSliders();
  }

  goToChild(id) {
    this.parentNodes.push(this.node);
    this._goToNode(id);
    this._checkSliders();
    this._checkSelection();
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

  toggleItem(item) {
    item.selected = !item.selected;
    this._addOrRemove(item);
    this._checkSliders();
    this._checkDifference();
  }

  toggleAll() {
    this.toggle = !this.toggle
    this.node.childs.forEach(item => {
      item.selected = this.toggle
      this._addOrRemove(item);
    })
    this._checkDifference();
  }

  private _checkSliders() {
    if (!this.node.childs) return;
    this.toggle = this.node.childs.every(item => item.selected);
  }

  private _addOrRemove(item) {
    if (item.selected) {
      if (this.userSelection.indexOf(item.id_node) === -1) {
        this.userSelection.push(item.id_node);
        this._toggleAllChilds(item, 'on');
      }
    } else {
      let pos = this.userSelection.indexOf(item.id_node);
      this.userSelection.splice(pos, 1);
      this._toggleAllChilds(item, 'off');
    }
  }

  private _checkSelection() {
    if (this.userSelection.length) {
      this.node.childs.forEach((node) => {
        if (this.userSelection.indexOf(node.id_node) !== -1) {
          node.selected = true;
        }
      });
    }
  }

  private _checkDifference() {
    this.showSaveButton = (JSON.stringify(this.inquiryform.nodeslist) != this.initialSelection);
  }

  private _toggleAllChilds(node, status) {
    if (!node.childs || node.childs.length == 0) return;
    node.childs.forEach(child => {
      if (child.childs) {
        this._toggleAllChilds(child, status);
      }
      if (status == 'on') {
        if (this.userSelection.indexOf(child.id_node) === -1) {
          child.selected = true;
          this.userSelection.push(child.id_node);
        }
      } else {
        if (this.userSelection.indexOf(child.id_node) !== -1) {
          child.selected = false;
          let pos = this.userSelection.indexOf(child.id_node);
          this.userSelection.splice(pos, 1);
        }
      }
    });
  }

  save() {
    this.inquiryform.nodeslist = JSON.stringify(this.userSelection);
    this.restService.save(this.inquiryform, 'hist/inquiryforms', null, 'id_inquiryform').subscribe((InquiryForm) => {
      this.router.navigate(['/questionnaire/liste']);
    }, (err) => {
      console.error(err);
    });
  }

}
