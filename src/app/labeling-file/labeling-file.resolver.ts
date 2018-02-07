import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../common/models/node';
import { AuditResolver } from '../common/resolvers/audit.resolver';
import { RestService } from '../rest.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class LabelingFileResolver implements Resolve<any> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    let id = parseInt(route.params['id']);
    // if (id) elems.push(this._getAudit(idOrKey).map(r => ret['idOrKey']=r));
    // if (id2) elems.push(this._getAudit(id2).map(r => ret['id2']=r));
    // if (id3) elems.push(this._getAudit(id3).map(r => ret['id3']=r));
    // if (idOrKey) {
    //   return Observable.forkJoin(elems, () => ret);
    // } else {
    //   return null;
    // }
    return null
  }

}
