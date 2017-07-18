import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../node/node';
import { RestService } from '../rest.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuditListResolver implements Resolve<any> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    return this.restService.getList('audits', {active: 1, sort: '-start_date'})
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
