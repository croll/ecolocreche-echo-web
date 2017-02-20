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
    let obj = {audit: null, establishment: null, nodes: null, inquiryform: null}
    let key = route.params['key'];
    let id = route.params['id'];
    let url = (key) ? `rest/audits?key=${key}` : `rest/audits?id=${id}`;
    return this.http.get(url)
                    .map((res: Response) => {
                      return res.json();
                    })
                    .flatMap(audit => {
                      obj.audit = audit[0];
                      return this.restService.get(obj.audit.id_inquiryform, 'hist/inquiryforms', {date: obj.audit.createdAt});
                    })
                    .flatMap(inquiryform => {
                      obj.inquiryform = inquiryform;
                      return this.restService.getList('hist/nodes?recurse=1', {id_inquiryform: obj.audit.id_inquiryform, date: obj.audit.createdAt, id_audit: obj.audit.id})
                    })
                    // .flatMap(nodes => {
                    //   var node = new Node();
                    //   node.childs = nodes;
                    //   obj.nodes = this._filterSelectedNodes(node, JSON.parse(obj.inquiryform.nodeslist));
                    //   return this.restService.get(obj.audit.id_establishment, 'establishments')
                    // })
                    .flatMap(nodes => {
                      //  obj.establishment = establishment
                       var node = new Node();
                       node.childs = nodes;
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
