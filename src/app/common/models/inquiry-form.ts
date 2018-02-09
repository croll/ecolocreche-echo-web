export class InquiryForm {
  public id: number
  public id_inquiryform: number
  public title: string
  public inquiry_type: InquiryForm.Inquiry_type
  public description: string = ''
  public comment: string = ''
  public position: number = 0
  public nodeslist: string;
  public mail_from: string;
  public mail_body: string;
  public mail_title: string;
  public audit_report_header: string;
}

export class InquiryFormExt extends InquiryForm {
  public selected: boolean;
}

export namespace InquiryForm {
  export enum Inquiry_type {
    Audit = "audit",
    RecapAction = "recapaction",
  }
}
