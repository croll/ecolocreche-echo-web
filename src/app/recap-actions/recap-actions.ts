import { InquiryForm } from '../inquiry-form/inquiry-form';

export class RecapActions extends InquiryForm {
  public id: number
  public id_inquiryform: number
  public title: string
  public description: string = ''
  public comment: string = ''
  public position: number = 0
  public nodeslist: string;
}

export class RecapActionsExt extends RecapActions {
  public selected: boolean;
}
