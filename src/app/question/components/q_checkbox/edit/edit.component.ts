import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
      color: "#008000",
    },
    {
      id: 2,
      label: "Faible",
      color: "#99cc00",
    },
    {
      id: 3,
      label: "Neutre",
      color: "#ffff00",
    },
    {
      id: 4,
      label: "Fort",
      color: "#ff9900",
    },
    {
      id: 5,
      label: "Trés fort",
      color: "#ff0000",
    },
    {
      id: 6,
      label: "Aucun",
      color: "#ffffff",
    }
  ];

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  addChoice() {
    if (!this.choices)
      this.choices = [];
    this.choices.push(new Choice());
    return false;
  }

  getImpact(id_impact) {
    for (let impact of this.impactList) {
      if (impact.id == id_impact)
        return impact;
    }
    return null;
  }

  getImpactColorStyle(id_impact) {
    let impact = this.getImpact(id_impact);
    if (impact)
      return this.sanitizer.bypassSecurityTrustStyle("background-color: "+impact.color);
    else
      return this.sanitizer.bypassSecurityTrustStyle("background-color: none");
  }

}
