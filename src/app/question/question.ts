import { Choice } from './choice';
import { Answer } from './answer';
import { Node } from '../common/models/node';

export class Question {

  public id: number
  public id_node: number
  public id_node_parent: number = null
  public title: string = ""
  public description: string = ""
  public privcomment: string = ""
  public type: string
  public position: number
  public color: string
  public nodepath: Array<Node>;

  public choices: Choice[]
  public answer: Answer = new Answer()
  public inquiry_type: Question.Inquiry_type
}

export namespace Question {
  export enum Inquiry_type {
    Audit = "audit",
    RecapAction = "recapaction",
  }
}
