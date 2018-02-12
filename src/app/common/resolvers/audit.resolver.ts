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

    // If we have a simple id or key, we want to display a report for an unique audit
    let key = route.params['key'];
    let id = parseInt(route.params['id']);
    let idOrKey = (key) ? key : id;

    // If we get and id_labeling_files first we get the corresponding audits and labeling_file ids
    let id_labeling_files = parseInt(route.params['id_labeling_file']);

    let observable:Observable<any>;

    let ret={};

    if (idOrKey) {
      return this._getAudit(idOrKey).map(r => {ret['audit1']=r; return ret});
    } else {
      let elems = [];
      return this.restService.get(id_labeling_files, 'datalabelingfiles').flatMap(lf => {
        if (lf.id_audit_1) elems.push(this._getAudit(lf.id_audit_1).map(r => ret['audit1']=r));
        if (lf.id_audit_2) elems.push(this._getAudit(lf.id_audit_2).map(r => ret['audit2']=r));
        if (lf.id_recap_actions) elems.push(this._getAudit(lf.id_recap_actions).map(r => ret['recap_actions']=r));
        return Observable.forkJoin(elems, () => {
          return ret;
        })
      });
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
                      // console.log(obj.audit);
                      if (obj.audit.id_audit_src) {
                        return this._getAudit(obj.audit.id_audit_src);
                      } else return Observable.of(null);
                    })
                    .flatMap(audit_src => {
                      if (audit_src) {
                        obj.audit.audit_src = audit_src;
                      }
                      return this.restService.get(obj.audit.id_inquiryform, 'hist/inquiryforms', {date: obj.audit.createdAt});
                    })
                    .flatMap(inquiryform => {
                      obj.inquiryform = inquiryform;
                      return this.restService.getList('hist/nodes?recurse=1', {id_inquiryform: obj.audit.id_inquiryform, date: obj.audit.createdAt, id_audit: obj.audit.id, audit_key: obj.audit.key})
                    })
                    .flatMap(nodes => {
                       var node = new Node();
                       node.childs = nodes;
                       obj.nodes = (obj.inquiryform.nodeslist) ? this._filterSelectedNodes(node, JSON.parse(obj.inquiryform.nodeslist)) : [];
                       return Observable.of(obj);
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

@Injectable()
export class AuditResolverPreviousAudits implements Resolve<any> {
  constructor(private restService: RestService, private http: Http) {
  }
  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    return this.restService.getList('audits', {
      id_establishment: route.params['id_establishment'],
    });
  }
}
