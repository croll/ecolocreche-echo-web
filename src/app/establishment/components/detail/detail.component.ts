import { Component, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Establishment } from '../../establishment';
import { RestService } from '../../../rest.service';
import { Audit } from '../../../common/models/audit';
import { LabelingFile } from '../../../common/models/labeling-file';
import { AuthService } from '../../../auth.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {

  private id: number;
  item: any;
  infos: any;
  labelingFileToCreate: {audits: number[], recap_actions: number[]};

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, public authService: AuthService) {
    this.item = Object.assign(new Establishment(), this.route.snapshot.data['infos']);
    this.labelingFileToCreate = {audits: [], recap_actions: [0]};
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

  public toggleInLabelingFile(id, type) {
    let pos = this.labelingFileToCreate[type].indexOf(id);
    if (pos != -1) {
      this.labelingFileToCreate[type].splice(pos, 1);
    } else {
      this.labelingFileToCreate[type].push(id);
    }
  }

  public createLabelingFile() {
    var lf = new LabelingFile();
    lf.id_establishment = this.item.id;
    lf.id_audit_1 = this.labelingFileToCreate.audits[0];
    if (this.labelingFileToCreate.audits[1]) {
      lf.id_audit_2 = this.labelingFileToCreate.audits[1];
    }
    if (this.labelingFileToCreate.recap_actions[0]) {
      lf.id_audit_recap_actions = this.labelingFileToCreate.recap_actions[0];
    }
    this.restService.save(lf, 'labelingfiles', {}, 'id', "Création : ").subscribe(res => {
      this.router.navigate(['/dossier_de_labelisation', res.id]);
    });
  }

}
