import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../inquiry-form';
import { Node } from '../../../node/node';
import { RestService } from '../../../rest.service';
import * as moment from 'moment'

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

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

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.id_inquiryform = parseInt(this.route.snapshot.params['id']);
    this.inquiryform = new InquiryForm();
  }

  ngOnInit() {
    this.restService.get(this.id_inquiryform, 'hist/inquiryforms').subscribe(info => {
      this.inquiryform = info;
      if (!this.inquiryform.nodeslist) {
        this.inquiryform.nodeslist = [];
      }
      this.initialSelection = JSON.stringify(this.inquiryform.nodeslist);
      this.node = new Node();
      this.node.childs = this.route.snapshot.data['inquiryFormTree']
      this.node.childs.forEach((node) => {
        if (this.inquiryform.nodeslist.indexOf(node.id_node) !== -1) {
          node.selected = true;
        }
      });
      this.filteredChildList = this.node.childs;
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
      this.inquiryform.nodeslist.push(item.id_node);
    } else {
      let pos = this.inquiryform.nodeslist.indexOf(item.id_node);
      this.inquiryform.nodeslist.splice(pos, 1);
    }
  }

  private _checkDifference() {
    console.log(JSON.stringify(this.inquiryform.nodeslist));
    this.showSaveButton = (JSON.stringify(this.inquiryform.nodeslist) != this.initialSelection);
  }

  save() {
    this.restService.save(this.inquiryform, 'hist/inquiryforms', null, 'id_inquiryform').subscribe((InquiryForm) => {
      this.router.navigate(['/questionnaire', InquiryForm.id_inquiryform]);
    }, (err) => {
      console.error(err);
    });
  }

}
