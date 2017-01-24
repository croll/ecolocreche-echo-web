import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Establishment } from '../../establishment';
import { EstablishmentService} from '../../services/establishment.service';

@Component({
  templateUrl: './establishment-detail.component.html',
  styleUrls: ['./establishment-detail.component.scss'],
})
export class EstablishmentDetailComponent implements OnInit {

  private id: number;
  item: Establishment;

  constructor(private router: Router, private route: ActivatedRoute, private establishmentService: EstablishmentService) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.item = new Establishment();
  }

  ngOnInit() {
    this.establishmentService.get(this.id).subscribe(item => {
      this.item = item;
    });
  }

}
