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

  constructor() {
    this.childs = [];
  }
}
