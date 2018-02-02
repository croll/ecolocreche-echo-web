import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Node } from '../common/models/node';
import { RestService } from '../rest.service';

@Injectable()
export class RecapActionsThemesResolver implements Resolve<Node[]> {

  constructor(private restService: RestService) {}

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    return this.restService.get(route.params['id'], 'hist/inquiryforms')
      .flatMap(inquiryform => {
        console.log(inquiryform);
        let observable_nodes: Observable<any>[] = [];
        if (!inquiryform.nodeslist) {
          return Observable.of([]);
        }
        let nodeslist = JSON.parse(inquiryform.nodeslist);
        nodeslist.forEach(id_node => {
          observable_nodes.push(this.restService.get(id_node, 'hist/nodes'));
        });
        console.log(observable_nodes);
        return Observable.forkJoin(observable_nodes, (...nodes) => {
          console.log(typeof nodes);
          console.log(nodes);
          return nodes;
        });
      });
    }
}
