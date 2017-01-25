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

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.item = new InquiryForm();
  }

  ngOnInit() {
    this.restService.get(this.id).subscribe(item => {
      this.item = item;
    });
  }

}
