import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../../question';
import { RestService } from '../../../../rest.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  private id: number;
  item: Question;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.item = new Question();
  }

  ngOnInit() {
    this.restService.get(this.id, 'hist/node').subscribe(item => {
      this.item = item;
    });
  }

}
