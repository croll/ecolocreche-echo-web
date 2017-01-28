import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../question';
import { Choice } from '../../choice';
import { QTypes } from '../abstracts/qtypes';
import { RestService} from '../../../rest.service';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  qtypes = QTypes.getInstance();

  echosForm: FormGroup;
  current: Question;
  choices : Choice[] = [];

  idCtrl: FormControl;
  titleCtrl: FormControl;
  descriptionCtrl: FormControl;
  typeCtrl: FormControl;

  private id_node: number;
  private id_node_parent: number;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {

    this.current = new Question();

    this.idCtrl = fb.control(this.id_node);
    this.titleCtrl = fb.control(this.current.title, [Validators.required, Validators.minLength(3)]);
    this.descriptionCtrl = fb.control(this.current.description);
    this.typeCtrl = fb.control(this.current.type, [Validators.required]);

    this.echosForm = fb.group({
      id_node: this.idCtrl,
      title: this.titleCtrl,
      description: this.descriptionCtrl,
      type: this.typeCtrl,
    });

  }

  ngOnInit() {
    this.id_node_parent = this.route.snapshot.params['id_node_parent'];
    this.id_node = this.route.snapshot.params['id_node'];
    if (this.id_node) {
      this.get();
    }
  }

  get() {
      this.restService.get(this.id_node, 'hist/nodes').subscribe(item => {
        this.echosForm.patchValue(item);
        this.current = Object.assign(this.current, item);
        this.choices = [];
        if ('choices' in item) {
          item.choices.forEach((jschoice) => {
            let choice = new Choice();
            Object.assign(choice, jschoice);
            this.choices.push(choice);
          })
        }
      }, (err) => {
        console.error(err);
      });
  }

  save() {
    let params = this.id_node ? {} : { id_node_parent: this.id_node_parent };
    this.current = Object.assign(this.current, this.echosForm.value);
    this.current.choices = this.choices;
    this.restService.save(this.current, 'hist/nodes', params).subscribe((node_hist) => {
      this.router.navigate(['/question', node_hist.id_node]);
    }, (err) => {
      console.error(err);
    });
  }

  delete() {
    this.restService.delete(this.id_node, 'hist/nodes').subscribe((response) => {
      this.router.navigate(['/questionnaire/liste']);
    }, (err) => {
      console.error(err);
    });
    return false;
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
