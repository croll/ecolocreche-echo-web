import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Establishment } from '../../establishment';
import { RestService } from '../../../rest.service';
import { Audit } from '../../../audit/audit';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  private id: number;
  item: Establishment;
  auditList: Audit[];

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.item = new Establishment();
  }

  ngOnInit() {
    this.restService.get(this.id, 'establishments').subscribe(item => {
      this.item = Object.assign(this.item, item);
    });
    this._getAudits();
  }

  getStatusLabel(id) {
    if (!this.item || !this.item.status) return;
    return this._getLabel(this.item.statusList, this.item.status);
  }

  getTypeLabel(id) {
    if (!this.item || !this.item.type) return;
    return this._getLabel(this.item.typeList, this.item.type);
  }

  private _getLabel(list, id) {
    let match = null;
    list.forEach(function(s:any) {
      if (s.id == id) {
        match = s.label;
        return;
      }
    });
    return match;
  }

  private _getAudits() {
    this.restService.getList('audits', {id_establishment: this.id}).subscribe(audits => this.auditList = audits);
  }

}
