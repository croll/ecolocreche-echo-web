import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../common/models/node';
import { RestService } from '../rest.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class AuditListResolved {
  audits: any[];
  plop: number;
}

@Injectable()
export class AuditListResolver implements Resolve<AuditListResolved> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    return this.restService.getList('audits', {active: 1, inquiry_type: 'audit', sort: '-date_start'})
      .flatMap(audits => {
        let observable_audits: Observable<any>[] = [];
        audits.forEach(audit => {
          observable_audits.push(this.restService.get(audit.id_inquiryform, 'hist/inquiryforms', { with_deleteds: 1 }).map(iq => {
            audit.inquiryform = iq;
          }));
        });
        return Observable.forkJoin(observable_audits, plop => {
          return audits;
        });
      });
    }
}
