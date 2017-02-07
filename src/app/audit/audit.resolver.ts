import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../node/node';
import { RestService } from '../rest.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuditResolver implements Resolve<any> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot):any {
    let key = route.params['key'];
    this.http.get(`rest/audits?key=${key}`)
                    .map((res) => res.json())
                    .subscribe(audit => {
                      console.log(audit);
                      this.restService.getList('hist/nodes?recurse=1', {id_inquiryform: audit.id_establishment});

                    });
  }
}
