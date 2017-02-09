import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../question';
import { Choice } from '../../choice';
import { Answer } from '../../answer';
import { QTypes } from '../abstracts/qtypes';
import { RestService} from '../../../rest.service';

@Component({
  selector: 'answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.scss']
})
export class AnswerEditComponent implements OnInit {

  @Input()
  id_node: number;
  @Input()
  id_audit: number;

  qtypes = QTypes.getInstance();

  isAnswered = false;

  echosForm: FormGroup;
  current: Question = new Question();
  choices : Choice[] = [];

  idCtrl: FormControl;
  ignoredCtrl: FormControl;
  valueCtrl: FormControl;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {


    this.idCtrl = fb.control(this.id_node);
    this.ignoredCtrl = fb.control(this.current.answer.ignored);
    this.valueCtrl = fb.control(this.current.answer.value);

    this.echosForm = fb.group({
      id_node: this.idCtrl,
      ignored: this.ignoredCtrl,
      value: this.valueCtrl,
    });

  }

  ngOnInit() {
      this.get();
  }

  get() {
      this.restService.get(this.id_node, 'hist/nodes', {
          id_audit: this.id_audit,
      }).subscribe(item => {
        //console.log("item: ", item);

        this.idCtrl.setValue(item.id_node);
        this.ignoredCtrl.setValue(item.answer ? item.answer.ignored : false);
        this.valueCtrl.setValue(item.answer ? item.answer.value : "");

        this.current = Object.assign(this.current, item);
        if (! this.current.answer) {
          this.current.answer = new Answer();
          this.current.answer.ignored = false;
          this.isAnswered = false;
        } else {
            this.isAnswered = true;
        }
        this.choices = [];
        if ('choices' in item) {
          item.choices.forEach((jschoice) => {
            let choice = new Choice();
            Object.assign(choice, jschoice);
            this.choices.push(choice);
          })
        }
      }, (err) => {
        console.error(err);
      });
  }

  save() {
      this.current.answer.ignored = this.ignoredCtrl.value ? this.ignoredCtrl.value : false;
      this.current.answer.value = this.valueCtrl.value ? this.valueCtrl.value : "{}";
      this.restService.save(this.current.answer, 'answers/'+this.id_audit+'/'+this.id_node, {}, "HACK TO ALWAYS DO A CREATE, NOT UPDATE").subscribe((res) => {
          //console.log("res :", res);
          this.isAnswered = true;
          this.ignoredCtrl.setValue(res.ignored);
          this.valueCtrl.setValue(res.value);
      });
      return false;
  }

  modify() {
      this.isAnswered = false;
      return false;
  }

}
