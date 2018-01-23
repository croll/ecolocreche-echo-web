import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../models/node';
import { RestService } from '../../rest.service';

@Injectable()
export class InquiryFormResolver implements Resolve<Node[]> {

  constructor(private restService: RestService) {}

  resolve(route: ActivatedRouteSnapshot):any {
    return this.restService.get(route.params['id'], 'hist/inquiryforms');
  }
}
