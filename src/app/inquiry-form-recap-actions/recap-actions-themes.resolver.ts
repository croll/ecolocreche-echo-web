import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Node } from '../common/models/node';
import { RestService } from '../rest.service';

@Injectable()
export class RecapActionsThemesResolver implements Resolve<Node[]> {

  constructor(private restService: RestService) {}

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    // return (route.params['id']) ? this.restService.getList('hist/nodes', {id_inquiryform: route.params['id'], inquiry_type: Node.Inquiry_type.RecapAction, type: 'directory'}) : null;
    if (!route.params['id']) {
      return Observable.of(null);
    }
    return this.restService.getList('hist/nodes', {id_inquiryform: route.params['id'], inquiry_type: Node.Inquiry_type.RecapAction, type: 'directory'}).flatMap(nodes => {
      var observable_nodes = [];
      nodes.forEach(node => {
        if (node.linked_to_node_id) {
          observable_nodes.push(this.restService.get(node.linked_to_node_id, 'hist/nodes').map(n => {
            node.linked_to_node = n;
          }));
        }
      });
      return (observable_nodes.length) ? Observable.forkJoin(observable_nodes, () => {return nodes}) : Observable.of(nodes);
    });
  }
}
