export class Node {

  public id: number
  public id_node: number
  public type: string
  public title: string
  public position: number
  public description: string
  public family: string
  public privcomment: string
  public color: string
  public childs: any[]
  public nodepath: string
  public linked_to_node_id: number
  public inquiry_type: Node.Inquiry_type

  constructor() {
    this.childs = [];
  }
}

export namespace Node {
  export enum Inquiry_type {
    Audit = "audit",
    RecapAction = "recapaction",
  }
}
