import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../node/node';
import { RestService } from '../rest.service';

@Injectable()
export class InquiryFormTreeResolver implements Resolve<Node[]> {

  constructor(private restService: RestService) {}

  resolve(route: ActivatedRouteSnapshot):any {
    return this.restService.getList('hist/nodes?recurse=1', {id_inquiryform: route.params['id']});
  }
}
