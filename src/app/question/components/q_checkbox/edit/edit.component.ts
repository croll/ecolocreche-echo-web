import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from '../../../question';
import { Choice } from '../../../choice';

@Component({
  selector: 'q-checkbox-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  @Input()
  choices: Choice[];

  impactList= [
    {
      id: 1,
      label: "Trés faible",
    },
    {
      id: 2,
      label: "Faible",
    },
    {
      id: 3,
      label: "Neutre",
    },
    {
      id: 4,
      label: "Fort",
    },
    {
      id: 5,
      label: "Trés fort",
    },
    {
      id: 6,
      label: "Aucun",
    }
  ];

  constructor(private fb: FormBuilder) {
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
