import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../inquiry-form';
import { RestService } from '../../../rest.service';
import * as moment from 'moment'

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  private id: number;
  item: InquiryForm;
  childList: InquiryFormExt[];
  filteredChildList: InquiryFormExt[];
  hideUnselected: boolean;
  level: number = -1;
  node: any;
  toggle: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.item = new InquiryForm();
  }

  ngOnInit() {
    this.restService.get(this.id, 'inquiryforms').subscribe(item => {
      this.item = item;
    });
    this.getChilds();
  }

  getChilds(id?: number) {
    let params = null;
    if (id) {
      params = {id_node_parent: id}
      this.getParent(id);
    }
    this.restService.getList('hist/nodes', params).subscribe(items => {
      this.childList = items;
      this.filteredChildList = items;
      this.toggle = false;
      this.checkSliders();
    });
  }

  getParent(id) {
    this.restService.get(id, 'hist/nodes').subscribe(item => {
      this.node = item;
    });
  }

  goToParent(id) {
    this.node = null;
    this.getChilds(id);
  }

  filterList(filter) {
    this.filteredChildList = filter ? this.childList.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.childList;
  }

  toggleItem(item) {
    item.selected = !item.selected;
    this.checkSliders();
  }

  toggleAll() {
    this.toggle = !this.toggle
    this.childList.forEach(item => item.selected = this.toggle)
  }

  checkSliders() {
    if (!this.childList) return;
    this.toggle = this.childList.every(listItem => listItem.selected)
  }

}
