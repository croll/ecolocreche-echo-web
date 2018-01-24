import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../common/models/node';
import { RestService } from '../rest.service';

@Injectable()
export class RecapActionsThemeResolver implements Resolve<Node[]> {

  constructor(private restService: RestService) {}

  resolve(route: ActivatedRouteSnapshot):any {
    return (route.params['id_theme']) ? this.restService.get(route.params['id_theme'], 'hist/nodes') : null;
  }
}
