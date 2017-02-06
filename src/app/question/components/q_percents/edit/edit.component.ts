import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Impact } from '../../abstracts/impacts';
import { Question } from '../../../question';
import { Choice } from '../../../choice';

@Component({
  selector: 'q-percents-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  @Input()
  choices: Choice[];

  impact: Impact;

  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer) {
    this.impact = Impact.getInstance(sanitizer);
  }

  ngOnInit() {
  }

  addChoice() {
    if (!this.choices)
      this.choices = [];
    this.choices.push(new Choice());
    return false;
  }

  deleteChoice(choice_to_delete) {
    var index = this.choices.indexOf(choice_to_delete);
    if (index >= 0) this.choices.splice(index, 1);
  }

  swap(num1, num2) {
    let tmp = this.choices[num2];
    this.choices[num2] = this.choices[num1];
    this.choices[num1] = tmp;
    return false;
  }

}
