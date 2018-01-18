export class InquiryForm {
  public id: number
  public id_inquiryform: number
  public title: string
  public description: string = ''
  public comment: string = ''
  public position: number = 0
  public nodeslist: string;
  public mail_body: string;
  public mail_title: string;
}

export class InquiryFormExt extends InquiryForm {
  public selected: boolean;
}
