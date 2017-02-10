import { Component, OnInit, Input, forwardRef, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Impact } from '../../abstracts/impacts';
import { Question } from '../../../question';
import { Choice } from '../../../choice';
import { Answer } from '../../../answer';

@Component({
  selector: 'q-percents-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AnswerEditComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AnswerEditComponent), multi: true }
  ]
})
export class AnswerEditComponent implements OnInit {

  @Input() choices: Choice[];
  @Input() answer: Answer;
  @Input('value') _value = "";
  @Input() readonly: boolean;

  propagateChange:any = () => {};
  validateFn:any = () => {};

  impact: Impact;
  vals = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
  nothundred = false;

  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer) {
    this.impact = Impact.getInstance(sanitizer);
  }

  findChoiceById(id_choice) : Choice {
      for (let choice of this.choices) {
          if (choice.id_choice == id_choice)
            return choice;
      }
      return null;
  }

  ngOnInit() {
      this.value=this._value;
  }

  updatevalue() {
      let latest_choice=this.choices.slice(-1).pop();
      let total = 0;
      for (let choice of this.choices) {
          if (choice != latest_choice)
            total+=choice['value'];
      }

      let latestval=100 - total;
      if (latestval < 0)
            latestval = 0;
      if (latestval > 100)
         latestval=100;

      latest_choice['value']=latestval;

      this.propagateChange(this.value);
  }

  get value() {
      let res={};
      for (let choice of this.choices) {
          res[choice.id_choice] = choice['value'];
      }
      return JSON.stringify(res);
  }

  set value(val) {
      if (val) {
          let ar=JSON.parse(val);
          for (let id_choice in ar) {
              let choice = this.findChoiceById(id_choice);
              let value = parseInt(ar[id_choice]);
              if (choice) choice['value'] = value;
          }
      }
      //this.propagateChange(val);
      this.propagateChange(this.value);
  }

  ngOnChanges(inputs) {
      /*
    if (inputs.counterRangeMax || inputs.counterRangeMin) {
      this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
      this.propagateChange(this.counterValue);
    }
    */
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  validate(c: FormControl) {
      let err = {
          badTotalError: {
              given: c.value,
          }
      };

      if (c.value) {
          let total = 0;
          let ar=JSON.parse(c.value);
          for (let id_choice in ar) {
              let value = parseInt(ar[id_choice]);
              total+=value;
          }
          if (total != 100) {
              this.nothundred = true;
              return err;
          }
      } else {
          this.nothundred = true;
          return err;
      }
      this.nothundred = false;
  }

}
