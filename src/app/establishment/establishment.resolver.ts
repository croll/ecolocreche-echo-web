import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../node/node';
import { RestService } from '../rest.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatAll';

@Injectable()
export class EstablishmentResolver implements Resolve<any> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.params['id'];
    let establishment;
    return this.restService.get(id, 'establishments')
                    .flatMap(est => {
                      establishment = est;
                      return this.restService.getList('audits', {id_establishment: establishment.id});
                    })
                    .flatMap(audits => {
                      //  obj.establishment = establishment
                       establishment.audits = audits;
                       return Observable.create(observer => {
                          observer.next(establishment);
                          observer.complete();
                       });
                    })
  }

}
