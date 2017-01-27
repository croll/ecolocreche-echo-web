import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../question';
import { RestService} from '../../../rest.service';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  typeList = [{
    id: 'q_radio',
    label: "Question fermée à choix unique",
  },{
    id: 'q_checkbox',
    label: "Question fermée à choix multiple",
  },{
    id: 'q_percents',
    label: "Question fermée à choix multiple pondéré",
  },{
    id: 'q_text',
    label: "Question ouverte",
  },{
    id: 'q_numeric',
    label: "Question ouverte numérique",
  }];

  echosForm: FormGroup;
  current: Question;

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
        this.current = item;
      }, (err) => {
        console.error(err);
      });
  }

  save() {
    let path = this.id_node ? 'hist/nodes' : 'hist/nodes/'+this.id_node_parent;
    console.log("values: ", this.echosForm.value);
    this.restService.save(this.echosForm.value, path).subscribe((node_hist) => {
      this.router.navigate(['/question', node_hist.id_node]);
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    this.restService.delete(id, 'hist/nodes').subscribe((response) => {
      this.router.navigate(['/questionnaire/liste']);
    }, (err) => {
      console.error(err);
    });
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
