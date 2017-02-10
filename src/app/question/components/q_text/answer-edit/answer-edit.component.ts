import { Component, OnInit, Input, forwardRef, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Impact } from '../../abstracts/impacts';
import { Question } from '../../../question';
import { Choice } from '../../../choice';
import { Answer } from '../../../answer';

@Component({
  selector: 'q-text-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AnswerEditComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AnswerEditComponent), multi: true }
  ]
})
export class AnswerEditComponent implements OnInit {

  @Input() answer: Answer;
  @Input('value') _value = "";
  @Input() readonly: boolean;

  propagateChange:any = () => {};

  impact: Impact;

  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer) {
    this.impact = Impact.getInstance(sanitizer);
  }

  ngOnInit() {
      this.value=this._value;
  }

  updatevalue() {
      this.propagateChange(this.value);
  }

  get value() {
      return this._value;
  }

  set value(val) {
      this._value=val;
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
    //return this.validateFn(c);
  }

}
