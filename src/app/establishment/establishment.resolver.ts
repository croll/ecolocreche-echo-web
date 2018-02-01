import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../common/models/node';
import { RestService } from '../rest.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concatAll';
import { EstablishmentExt } from './establishment';
import { Audit } from '../common/models/audit';

@Injectable()
export class EstablishmentResolver implements Resolve<any> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

    let id = route.params['id'];
    let infos = {audits: null, labeling_files: null};
    return this.restService.get(id, 'establishments')
      .flatMap(establishmentInfos => {
        return Observable.forkJoin(
          this.restService.getList('audits', {id_establishment: id, sort:'-date_start'}).map(res => infos.audits = res),
          this.restService.getList('labelingfiles', {id_establishment: id, sort:'-createdAt'}).map(res => infos.labeling_files = res),
          () => {
            let establishment = Object.assign(new EstablishmentExt(), establishmentInfos);
            return [establishment, infos];
          }
        );
      })
      .flatMap(([establishment, infos]) => {
        let observable_audits: Observable<any>[] = [];
        let observable_labeling_files: Observable<any>[] = [];

        infos.audits.forEach(audit => {
          observable_audits.push(this.restService.get(audit.id_inquiryform, 'hist/inquiryforms').map(iq => {
            audit.inquiryform = iq;
            if (audit.inquiry_type == 'audit') {
              establishment.audits.push(audit);
            } else {
              establishment.recap_actions.push(audit);
            }
          }));
        });

        infos.labeling_files.forEach(labeling_file => {
          observable_labeling_files.push(this.restService.get(labeling_file.id, 'datalebelings').map(inf => {
            // TODO
            console.log(inf);
          }));
        });

        return Observable.forkJoin(observable_audits, () => {
          return establishment;
        });
    });
  }

}
