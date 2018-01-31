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
    let establishment = new EstablishmentExt();
    return this.restService.get(id, 'establishments')
                    .flatMap(est => {
                      Object.assign(establishment, est);
                      return this.restService.getList('audits', {id_establishment: establishment.id, sort:'-date_start'});
                    })
                    .flatMap(audits => {
                      if (!audits || audits.length == 0) {
                        return Observable.create(observer => {
                          establishment.audits = [];
                          observer.next(establishment);
                          observer.complete()});
                      }
                      let done = 0;
                       return Observable.create(observer => {
                        audits.forEach(audit => {
                          done++;
                          this.restService.get(audit.id_inquiryform, 'hist/inquiryforms').subscribe(iq => {
                            audit.inquiryform = iq;
                          })
                          if (audit.inquiry_type == 'audit') {
                            establishment.audits.push(audit);
                          } else {
                            establishment.recap_actions.push(audit);
                          }
                          if (audits.length == done) {
                            observer.next(establishment);
                            observer.complete();
                          }
                        });
                    });
                  });
  }

}
