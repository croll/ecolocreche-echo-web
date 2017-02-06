import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from '@angular/router';
import { Node } from '../node/node';
import { RestService } from '../rest.service';

@Injectable()
export class InquiryFormResolver implements Resolve<Node[]> {

  constructor(private route: ActivatedRoute, private restService: RestService) {}

  resolve():any {
    return this.restService.getList('hist/nodes?recurse=1', {id_inquiryform: this.route.snapshot.params['id']});
  }
}
