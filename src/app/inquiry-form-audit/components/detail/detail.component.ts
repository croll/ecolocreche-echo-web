import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../../common/models/inquiry-form';
import { Node } from '../../../common/models/node';
import { RestService } from '../../../rest.service';
import { AuthService } from '../../../auth.service';
import { ServercsvexportService } from '../../../servercsvexport.service'
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
  userSelection: any;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, private exporter: ServercsvexportService, public authService: AuthService) {
    this.id_inquiryform = parseInt(this.route.snapshot.params['id']);

    this.inquiryform = this.route.snapshot.data['inquiryForm'];

    this.node = new Node();
    this.node.childs = this.route.snapshot.data['inquiryFormTree']
    this.filteredChildList = this.node.childs;
    this.initialSelection = this.inquiryform.nodeslist;
    this.userSelection = (this.inquiryform.nodeslist) ? JSON.parse(this.inquiryform.nodeslist) : [];

  }

  ngOnInit() {
    this._checkSelection();
    this._checkSliders();
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
      this.filteredChildList = this.node.childs;
      return;
    }
    this.filteredChildList = [];
    if (this.node.type == 'directory' && !this.node.id_node_parent) {
      let matchedIds = [];
      this.node.childs.forEach(child => {
        if (child.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) {
          this.filteredChildList = this.filteredChildList.concat(child);
        } else {
          if (!child.childs || !child.childs.length) return;
          let matchs = child.childs.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1);
          if (matchs.length) {
            if (matchedIds.indexOf(child.id_node) === -1) {
              this.filteredChildList = this.filteredChildList.concat(child);
              matchedIds.push(child.id_node);
            }
          }
        }
      });
    } else {
      this.filteredChildList = this.node.childs.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1);
    }
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

  exportCSV() {
    this.exporter.download('/rest/export/nodes', {
      id_inquiryform: this.id_inquiryform,
    });
  }

}
