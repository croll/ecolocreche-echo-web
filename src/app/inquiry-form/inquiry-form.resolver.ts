import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from '@angular/router';
import { Node } from '../node/node';
import { RestService } from '../rest.service';

@Injectable()
export class InquiryFormResolver implements Resolve<Node[]> {

  constructor(private route: ActivatedRoute, private restService: RestService) {}

  resolve():any {
    let params;
    let id = this.route.snapshot.params['id'];
    if (id) {
      params = {id_inquiryform: id}
    } else {
      params = {key: this.route.snapshot.params['key']};
    }
    return this.restService.getList('hist/nodes?recurse=1', params);
  }
}
