import { Component, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Establishment } from '../../establishment';
import { RestService } from '../../../rest.service';
import { Audit } from '../../../common/models/audit';
import { LabelingFile } from '../../../common/models/labeling-file';
import { AuthService } from '../../../auth.service';
import { Observable } from 'rxjs'

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {

  private id: number;
  item: any;
  infos: any;
  labelingFileToCreate: {audits: Audit[], recap_actions: Audit[]};

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, public authService: AuthService) {
    this.item = Object.assign(new Establishment(), this.route.snapshot.data['infos']);
    this.labelingFileToCreate = {audits: [], recap_actions: []};
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

  public toggleInLabelingFile(item, type) {
    console.log(item, type);
    let pos = this.labelingFileToCreate[type].indexOf(item.id);
    if (pos != -1) {
      this.labelingFileToCreate[type].splice(pos, 1);
    } else {
      this.labelingFileToCreate[type].push(item);
    }
  }

  public createLabelingFile() {
    let lf = new LabelingFile();
    let obs:Observable<string>;
    lf.id_establishment = this.item.id;
    lf.id_audit_1 = this.labelingFileToCreate.audits[0].id;
    if (this.labelingFileToCreate.audits[1]) {
      lf.id_audit_2 = this.labelingFileToCreate.audits[1].id;
    }
    if (this.labelingFileToCreate.recap_actions[0]) {
      let jsonObj = new LabelingFile.Json();
      lf.id_audit_recap_actions = this.labelingFileToCreate.recap_actions[0].id;
      obs = this.restService.getList('hist/nodes?recurse=1', {id_inquiryform: this.labelingFileToCreate.recap_actions[0].id_inquiryform, id_audit: this.labelingFileToCreate.recap_actions[0].id, audit_key: this.labelingFileToCreate.recap_actions[0].key}).flatMap((themes) => {
        let obs2 = [];
        themes.forEach(theme => {
          let question1 = theme.childs[0];
          let question2 = theme.childs[1];

          // For recap action theme NOT linked to a global theme
          if (!theme.linked_to_node_id) {
            if (question1.answer.value) {
              if (!jsonObj.comments2) {
                jsonObj.comments2 = '';
              }
              jsonObj.comments2 += '<h2>'+theme.title+'</h2>'+question1.answer.value;
            }
            if (question2.answer.value) {
              if (!jsonObj.comments1) {
                jsonObj.comments1 = '';
              }
              jsonObj.comments1 += '<h2>'+theme.title+'</h2>'+question2.answer.value;
            }
            // For recap action theme linked to a global theme
          } else {
            obs2.push(this.restService.get(theme.linked_to_node_id, 'hist/nodes').map(linkedNode => {

              // For all linked theme question, "to be done" goes to last comment section
              if (question1.answer.value) {
                if (!jsonObj.comments2) {
                  jsonObj.comments2 = '';
                }
                jsonObj.comments2 += '<h2>'+theme.title+'</h2>'+question1.answer.value;
              }

              if (question2.answer.value) {
                // Responses of environnemental theme
                if (linkedNode.family == 'environnementales') {
                  jsonObj.themes_comments[parseInt(theme.linked_to_node_id)] = question2.answer.value;
                } else {
                  // Responses of social theme
                  if (!jsonObj.comments1) {
                    jsonObj.comments1 = '';
                  }
                  jsonObj.comments1 += '<h2>'+theme.title+'</h2>'+question2.answer.value;
                }
              }
            }));
          }
        });
        return Observable.forkJoin(obs2, () => {
          console.log(jsonObj);
          return JSON.stringify(jsonObj);
        });
      });
    } else {
    obs = Observable.of(null);
  }
    obs.subscribe((json) => {
      if (json) {
        lf.datajson = json;
      }
      this.restService.save(lf, 'labelingfiles', {}, 'id', "Création : ").subscribe(res => {
        this.router.navigate(['/dossier_de_labelisation', res.id]);
      });
    });
  }

}
