import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Node } from '../models/node';
import { InquiryForm } from '../models/inquiry-form';
import { RestService } from '../../rest.service';

export class AuditListResolved {
  audits: any[];
  plop: number;
}

@Injectable()
export class AuditListResolver implements Resolve<AuditListResolved> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    return this.restService.getList('audits', {active: 1, inquiry_type: InquiryForm.Inquiry_type.Audit, sort: '-date_start'})
      .flatMap(audits => {
        let observable_audits: Observable<any>[] = [];
        audits.forEach(audit => {
          observable_audits.push(this.restService.get(audit.id_inquiryform, 'hist/inquiryforms', { with_deleteds: 1 }).map(iq => {
            audit.inquiryform = iq;
          }));
        });
        return Observable.forkJoin(observable_audits, () => {
          return audits;
        });
      });
    }
}
