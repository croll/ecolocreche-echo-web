import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Node } from '../common/models/node';
import { RestService } from '../rest.service';
import { InquiryForm } from '../common/models/inquiry-form';

@Injectable()
export class InquiryFormTreeResolver implements Resolve<Node[]> {

  constructor(private restService: RestService) {}

  resolve(route: ActivatedRouteSnapshot):any {
    return this.restService.getList('hist/nodes?recurse=1', {
      inqinquiry_type: InquiryForm.Inquiry_type.Audit,
    });
  }
}
