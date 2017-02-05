import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { RestService } from '../../../rest.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    typeList = [
        {
            label: "Administrateur",
            id: "admin",
        },
        {
            label: "Super Agent",
            id: "superagent",
        },
        {
            label: "Agent",
            id: "agent",
        },
    ];

  private id: number;
  item: User;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.item = new User();
  }

  ngOnInit() {
    this.restService.get(this.id, 'users').subscribe(item => {
      this.item = item;
    });
  }

  getAccountType(id_type): any {
    for (let type of this.typeList) {
      if (type.id == id_type)
        return type;
    }
    return {
      id: 0,
      label: "Non défini",
    };
  }

}
