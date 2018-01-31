import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../models/node';
import { RestService } from '../../rest.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AuditResolver implements Resolve<any> {

  constructor(private restService: RestService, private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    let key = route.params['key'];
    let id = parseInt(route.params['id']);
    let id2 = parseInt(route.params['id2']);
    let id3 = parseInt(route.params['id3']);
    let idOrKey = (key) ? key : id;
    let elems = [];
    if (idOrKey) elems.push(this._getAudit(idOrKey));
    if (id2) elems.push(this._getAudit(id2));
    if (id3) elems.push(this._getAudit(id3));
    if (idOrKey) {
      return Observable.forkJoin(elems);
    } else {
      return null;
    }
  }

  private _getAudit(idOrKey) {
    let obj = {audit: null, nodes: null, inquiryform: null}
    let url = (typeof(idOrKey) == 'string') ? `rest/audits?key=${idOrKey}` : `rest/audits?id=${idOrKey}`;
    return this.http.get(url)
                    .map((res: Response) => {
                      return res.json();
                    })
                    .flatMap(audit => {
                      obj.audit = audit[0];
                      console.log(obj.audit);
                      return this.restService.get(obj.audit.id_inquiryform, 'hist/inquiryforms', {date: obj.audit.createdAt});
                    })
                    .flatMap(inquiryform => {
                      obj.inquiryform = inquiryform;
                      return this.restService.getList('hist/nodes?recurse=1', {id_inquiryform: obj.audit.id_inquiryform, date: obj.audit.createdAt, id_audit: obj.audit.id, audit_key: obj.audit.key})
                    })
                    .flatMap(nodes => {
                       var node = new Node();
                       node.childs = nodes;
                       console.log(JSON.parse(obj.inquiryform.nodeslist));
                       obj.nodes = this._filterSelectedNodes(node, JSON.parse(obj.inquiryform.nodeslist));
                       return Observable.create(observer => {
                          observer.next(obj);
                          observer.complete();
                       });
                    })

  }

  private _filterSelectedNodes(nodes, list) {
    for (let i = nodes.childs.length - 1; i >= 0; i -= 1) {
      if (list.indexOf(nodes.childs[i].id_node) == -1) {
        nodes.childs.splice(i, 1);
      } else if (nodes.childs[i].childs && nodes.childs[i].childs.length) {
        this._filterSelectedNodes(nodes.childs[i], list);
      }
    }
    return nodes;
  }

}
