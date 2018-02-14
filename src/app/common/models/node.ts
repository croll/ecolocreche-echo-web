export class Node {

  public id: number
  public id_node: number
  public id_node_parent: number
  public type: string
  public title: string
  public position: number
  public description: string
  public family: string
  public privcomment: string
  public color: string
  public childs: Node[]
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
