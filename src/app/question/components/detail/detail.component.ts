import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../question';
import { RestService } from '../../../rest.service';
import { QTypes } from '../abstracts/qtypes';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  qtypes = QTypes.getInstance();

  private id_node: number;
  item: Question = new Question();

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.id_node = parseInt(this.route.snapshot.params['id_node']);
  }

  ngOnInit() {
    this.restService.get(this.id_node, 'hist/nodes').subscribe(item => {
      this.item = item;
      console.log("item: ", item);
    });
  }

}
