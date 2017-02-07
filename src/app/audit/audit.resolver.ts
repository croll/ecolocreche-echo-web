import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../node/node';
import { RestService } from '../rest.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AuditResolver implements Resolve<any> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    let obj = {audit: null, establishment: null, nodes: null}
    let key = route.params['key'];
    return this.http.get(`rest/audits?key=${key}`)
                    .map((res: Response) => {
                      return res.json();
                    })
                    .flatMap(audit => {
                      obj.audit = audit[0];
                      return this.restService.getList('hist/nodes?recurse=1', {id_inquiryform: audit.id_establishment})
                    })
                    .flatMap(nodes => {
                      obj.nodes = nodes;
                      return this.restService.get(obj.audit.id_establishment, 'establishments')
                    })
                    .flatMap(establishment => {
                       obj.establishment = establishment
                       return Observable.create(observer => {
                          observer.next(obj);
                          observer.complete();
                       });
                    })
                    // .map(res => res.json())
                    // .subscribe(audit => {
                    //   console.log(audit);
                    //   this.restService.getList('hist/nodes?recurse=1', {id_inquiryform: audit.id_establishment});
                    //
                    // });
  }
}
