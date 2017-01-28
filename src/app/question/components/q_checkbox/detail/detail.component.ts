import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Impact } from '../../abstracts/impacts';
import { Question } from '../../../question';
import { Choice } from '../../../choice';

@Component({
  selector: 'q-checkbox-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends Impact implements OnInit {

  @Input()
  choices: Choice[];

  constructor(private router: Router, private route: ActivatedRoute, public sanitizer: DomSanitizer) {
    super(sanitizer);
  }

  ngOnInit() {
  }

}
