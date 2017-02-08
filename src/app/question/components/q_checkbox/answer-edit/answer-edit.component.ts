import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Impact } from '../../abstracts/impacts';
import { Question } from '../../../question';
import { Choice } from '../../../choice';
import { Answer } from '../../../answer';

@Component({
  selector: 'q-checkbox-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.scss'],
})
export class AnswerEditComponent implements OnInit {

  @Input()
  choices: Choice[];
  @Input()
  answer: Answer;
  @Input()
  echosForm: FormGroup;

  impact: Impact;

  answerValue: any;

  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer) {
    this.impact = Impact.getInstance(sanitizer);
  }

  ngOnInit() {
    //this.echosForm.addControl("answerValue", this.fb.control(this.answerValue));
  }

}
