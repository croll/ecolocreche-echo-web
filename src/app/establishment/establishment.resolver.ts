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
        let observable_infos: Observable<any>[] = [];
        observable_infos.push(this.restService.getList('audits', {id_establishment: id, sort:'-date_start'}));
        //observable_infos.push(this.restService.getList('labelingfiles', {id_establishment: establishment.id, sort:'-date_start'}));

        return Observable.forkJoin(observable_infos,
          infos => {
            let establishment = Object.assign(new EstablishmentExt(), establishmentInfos);
            //return {establishment: establishment, inquiryforms: infos[0], labeling_files: infos[1]}
            return {establishment: establishment, inquiryforms: infos}
          }
        );
      })
      .flatMap(infos => {
        let observable_inquiryforms: Observable<any>[] = [];
        infos.inquiryforms.forEach(inquiryform => {

          observable_inquiryforms.push(this.restService.get(inquiryform.id_inquiryform, 'hist/inquiryforms').map(iq => {
            inquiryform.inquiryform = iq;
            if (inquiryform.inquiry_type == 'audit') {
              infos.establishment.audits.push(inquiryform);
            } else {
              infos.establishment.recap_actions.push(inquiryform);
            }
          }));

        });
        return Observable.forkJoin(observable_inquiryforms, () => {
          return infos.establishment;
        });
    });
  }

}
