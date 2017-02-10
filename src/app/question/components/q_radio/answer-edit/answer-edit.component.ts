import { Component, OnInit, Input, forwardRef, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Impact } from '../../abstracts/impacts';
import { Question } from '../../../question';
import { Choice } from '../../../choice';
import { Answer } from '../../../answer';

@Component({
  selector: 'q-radio-answer-edit',
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

  radios: string;
  validateFn: any = () => {};

  propagateChange:any = () => {};

  impact: Impact;

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
      this.propagateChange(this.value);
  }

  get value() {
      if (this.radios) {
          let res={};
          res[this.radios]=100;
          return JSON.stringify(res);
      } else return null;
  }

  set value(val) {
      if (val) {
          let ar=JSON.parse(val);
          for (let id_choice in ar) {
              let choice = this.findChoiceById(id_choice);
              let value = parseInt(ar[id_choice]);
              if (choice && value > 0) {
                  this.radios=id_choice;
              }
          }
      }
      //this.propagateChange(val);
      this.propagateChange(this.value);
  }

  ngOnChanges(inputs) {
      this.validateFn = createEmptyValidator();
      this.propagateChange(this.value);
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
      return this.validateFn(c);
  }

}

export function createEmptyValidator() {
    return (c: FormControl) => {
        let err = {
            emptyError: {
                given: c.value,
            }
        };
        return (c.value == null || c.value == undefined || c.value=="" || c.value=="{}") ? err : null;
    }
}
