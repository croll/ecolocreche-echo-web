export class Node {

  public id: number
  public id_node: number
  public type: string
  public title: string
  public position: number
  public description: string
  public color: string
  public childs: any[]

  constructor() {
    this.childs = [];
  }
}
