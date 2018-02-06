import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Node } from '../common/models/node';
import { RestService } from '../rest.service';

@Injectable()
export class RecapActionsThemesResolver implements Resolve<Node[]> {

  constructor(private restService: RestService) {}

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    return (route.params['id']) ? this.restService.getList('hist/nodes', {id_inquiryform: route.params['id'], inquiry_type: Node.Inquiry_type.RecapAction, type: 'directory'}) : null;
  }
}
