import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../common/models/node';
import { RestService } from '../rest.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatAll';

@Injectable()
export class InquiryFormAuditNodeResolver implements Resolve<any> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id;
    if (route.params['id_category']) {
      id = route.params['id_category'];
    } else {
      id = route.params['id_theme'];
    }
    return this.restService.get(id, 'hist/nodes')
                    .flatMap(node => {
                       return Observable.create(observer => {
                          observer.next(node);
                          observer.complete();
                       });
                    });
  }

}
