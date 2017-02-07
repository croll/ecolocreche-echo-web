import { Choice } from './choice';
import { Answer } from './answer';

export class Question {

  public id: number
  public id_node: number
  public id_node_parent: number
  public title: string
  public description: string
  public type: string
  public position: number
  public color: string

  public choices: Choice[]
  public answer: Answer
}
