import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Node } from '../models/node';
import { InquiryForm } from '../models/inquiry-form';
import { RestService } from '../../rest.service';

@Injectable()
export class AuditListResolver implements Resolve<any> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    return this.restService.getList('audits', {active: 1, inquiry_type: InquiryForm.Inquiry_type.Audit, sort: '-date_start'})
      .flatMap(audits => {
        let done = 0;
         return Observable.create(observer => {
          audits.forEach(audit => {
            done++;
            this.restService.get(audit.id_inquiryform, 'hist/inquiryforms').subscribe(iq => {
              audit.inquiryform = iq;
            })
            if (audits.length == done) {
              observer.next(audits);
              observer.complete();
            }
          });
      });
  });
  }

}
