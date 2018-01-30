import { Component, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Establishment } from '../../establishment';
import { RestService } from '../../../rest.service';
import { Audit } from '../../../common/models/audit';
import { AuthService } from '../../../auth.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {

  private id: number;
  item: any;
  infos: any;
  auditsToCompare: {audits: number[], recap_actions: number[]};

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, public authService: AuthService) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.item = Object.assign(new Establishment(), this.route.snapshot.data['infos']);
    this.auditsToCompare = {audits: [], recap_actions: [null]};
  }

  getStatusLabel() {
    if (!this.item || !this.item.status) return;
    return this._getLabel(this.item.statusList, this.item.status);
  }

  getTypeLabel() {
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

  public toggleCompare(id, type) {
    let pos = this.auditsToCompare[type].indexOf(id);
    if (pos != -1) {
      this.auditsToCompare[type].splice(pos, 1);
    } else {
      this.auditsToCompare[type].push(id);
    }
  }

  public compare() {
    this.router.navigate(['/audit/comparer', this.auditsToCompare.audits[0], this.auditsToCompare.audits[1], this.auditsToCompare.recap_actions[0]]);
  }

}
