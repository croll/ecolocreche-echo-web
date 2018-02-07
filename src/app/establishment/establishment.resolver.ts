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
    return this.restService.get(id, 'establishments')
      .flatMap(establishmentInfos => {
        return Observable.forkJoin(
          this.restService.getList('audits', {id_establishment: id, sort:'-date_start'}),
          this.restService.getList('labelingfiles', {id_establishment: id, sort:'-createdAt'}),
          (audits, labeling_files) => {
            let establishment = Object.assign(new EstablishmentExt(), establishmentInfos);
            establishment.labeling_files = labeling_files;
            return [establishment, audits]
          }
        );
      })
      .flatMap(([establishment, audits]) => {

        let observable_audits: Observable<any>[] = [];
        audits.forEach(audit => {
          observable_audits.push(this.restService.get(audit.id_inquiryform, 'hist/inquiryforms').map(iq => {
            audit.inquiryform = iq;
            if (audit.inquiry_type == 'audit') {
              establishment.audits.push(audit);
            } else {
              establishment.recap_actions.push(audit);
            }
          }));
        });

        if (observable_audits.length) {
          return Observable.forkJoin(observable_audits, () => {
            return establishment;
          });
        } else {
          return Observable.of(establishment);
        }
        return null;
    });
  }

}
