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
  node: any;
  @Input()
  audit: any;

  qtypes = QTypes.getInstance();

  echosForm: FormGroup;
  current: Question = new Question();
  choices : Choice[] = [];

  idCtrl: FormControl;
  ignoredCtrl: FormControl;
  valueCtrl: FormControl;
  commentCtrl: FormControl;

  answer: Answer;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {


  }

  ngOnInit() {
      this.idCtrl = this.fb.control(this.node['id_node']);
      this.ignoredCtrl = this.fb.control(false);
      this.valueCtrl = this.fb.control("");
      this.commentCtrl = this.fb.control("new");

      this.echosForm = this.fb.group({
        id_node: this.idCtrl,
        ignored: this.ignoredCtrl,
        value: this.valueCtrl,
        comment: this.commentCtrl,
      });

      this.get();
  }

  get() {
      // console.log("item: ", this.node);
      if (!this.node.answer) {
        this.node.answer = new Answer();
        this.node.answer.ignored = false;
        this.node.answer.comment = "";
        this.node.answer.status = "new";
      } else {
        this.ignoredCtrl.setValue(this.node.answer.ignored);
        this.valueCtrl.setValue(this.node.answer.value);
        this.commentCtrl.setValue(this.node.answer.comment);
      }


      this.current = Object.assign(this.current, this.node);

      this.ignoreset(!!this.current.answer.ignored);

      this.choices = [];
      if ('choices' in this.node) {
        this.node.choices.forEach((jschoice) => {
          let choice = new Choice();
          Object.assign(choice, jschoice);
          this.choices.push(choice);
        })
      }
  }

  ignoreset(ignored: boolean) {
      if (ignored && this.echosForm.contains('value')) {
          this.echosForm.removeControl('value');
      } else if (!ignored && !this.echosForm.contains('value')){
          this.echosForm.addControl('value', this.valueCtrl);
      }
  }

  ignore() {
      this.current.answer.ignored = true;
      this.current.answer.comment = this.commentCtrl.value ? this.commentCtrl.value : "";
      this.echosForm.patchValue(this.current.answer);
      this.save();
  }

  unignore() {
    this.current.answer.ignored = false;
    this.echosForm.patchValue(this.current.answer);
    this.ignoreset(false);
  }

  save() {
      this.current.answer.ignored = this.ignoredCtrl.value ? this.ignoredCtrl.value : false;
      this.current.answer.value = this.valueCtrl.value ? this.valueCtrl.value : "{}";
      this.current.answer.comment = this.commentCtrl.value ? this.commentCtrl.value : "";
      var res = Object.assign(this.current.answer, {
          audit_key: this.audit['key'],
          status: 'saved',
      });
      this.restService.save(res, 'answers/'+this.audit['id']+'/'+this.node['id_node'], {}, "HACK TO ALWAYS DO A CREATE, NOT UPDATE", "Sauvegade de la réponse : ", "Ok").subscribe((res) => {
          this.ignoredCtrl.setValue(!!res.ignored);
          this.valueCtrl.setValue(res.value);
          this.commentCtrl.setValue(res.comment);
          this.current.answer.status = res.status;
      });
      return false;
  }

  modify() {
    // Proposition beve
    this.unignore();
    // Fin proposition beve
    this.current.answer.status = 'not-saved';
    return false;
  }

}
