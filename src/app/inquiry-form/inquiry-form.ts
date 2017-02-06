export class InquiryForm {
  public id: number
  public id_inquiryform: number
  public title: string
  public description: string = ''
  public position: number = 0
  public nodeslist: any;
}

export class InquiryFormExt extends InquiryForm {
  public selected: boolean;
}
