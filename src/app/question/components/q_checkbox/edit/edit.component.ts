import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Impact } from '../../abstracts/impacts';
import { Question } from '../../../question';
import { Choice } from '../../../choice';

@Component({
  selector: 'q-checkbox-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends Impact implements OnInit {

  @Input()
  choices: Choice[];

  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer) {
    super(null);
  }

  ngOnInit() {
  }

  addChoice() {
    if (!this.choices)
      this.choices = [];
    this.choices.push(new Choice());
    return false;
  }

}
