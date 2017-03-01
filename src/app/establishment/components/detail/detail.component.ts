import { Component, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Establishment } from '../../establishment';
import { RestService } from '../../../rest.service';
import { Audit } from '../../../audit/audit';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {

  private id: number;
  item: any;
  infos: any;
  auditsToCompare: number[];

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.item = Object.assign(new Establishment(), this.route.snapshot.data['infos']);
    this.auditsToCompare = [];
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

  public toggleCompare(id) {
    let pos = this.auditsToCompare.indexOf(id);
    if (pos != -1) {
      this.auditsToCompare.splice(pos, 1);
    } else {
      this.auditsToCompare.push(id);
    }
  }

  public compare() {
    this.router.navigate(['/audit/comparer', this.auditsToCompare[0], this.auditsToCompare[1]]);
  }

}
