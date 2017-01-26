import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm } from '../../inquiry-form';
import { RestService } from '../../services/rest.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  private id: number;
  item: InquiryForm;
  inquiryFormThemeList: any[];
  filteredInquiryFormThemeList: any[];
  themeList: any[];
  filteredThemeList: any[];

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.item = new InquiryForm();
  }

  ngOnInit() {
    this.restService.get(this.id, 'inquiryforms').subscribe(item => {
      this.item = item;
    });
    this.restService.getList('directories').subscribe(items => {
      console.log(items);
      this.themeList = items;
    });
  }

  filterList(filter) {
    this.filteredThemeList = filter ? this.themeList.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.themeList;
  }

}
