export class InquiryForm {
  public id: number
  public title: string
  public description: string = ''
  public position: number = 0
}

export class Node {
  public id: number;
  public id_directory_parent: number;
}

export class NodeHist {
  public id: number;
  public id_node: number;
  public type: string;
  public title: string;
  public description: string;
  public position: number;
  public color: string;
  public state: string;
}
