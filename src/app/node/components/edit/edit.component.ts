import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Node } from '../../node';
import { RestService } from '../../../rest.service';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  echosForm: FormGroup;
  id_node: number
  id_node_parent: number;
  id_theme: number;
  id_category: number;
  label: string;
  current: any;
  type: string; // theme or category
  idNodeCtrl: FormControl;
  typeCtrl: FormControl;
  titleCtrl: FormControl;
  descriptionCtrl: FormControl;
  positionCtrl: FormControl;
  colorCtrl: FormControl;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {

    this.current = new Node();

    this.idNodeCtrl = fb.control(this.id_node);
    this.typeCtrl = fb.control('directory');
    this.titleCtrl = fb.control(this.current.title, [Validators.required, Validators.minLength(3)]);
    this.descriptionCtrl = fb.control(this.current.description);
    this.positionCtrl = fb.control(this.current.position || 0);
    this.colorCtrl = fb.control(this.current.color);

    this.echosForm = fb.group({
      id_node: this.idNodeCtrl,
      type: this.typeCtrl,
      title: this.titleCtrl,
      description: this.descriptionCtrl,
      position: this.positionCtrl,
      color: this.colorCtrl
    });

  }

  ngOnInit() {
    this.id_theme = this.route.snapshot.params['id_theme'];
    this.id_category = this.route.snapshot.params['id_category'];
    this.id_node_parent = this.route.snapshot.params['id_node_parent'] || null;
    if (this.route.snapshot.url.length == 4 && this.route.snapshot.url[1].path == 'rubrique') {
      this.id_node = this.id_category;
      this.type = 'category';
      this.id_node_parent = this.id_theme
    } else {
      this.id_node = this.id_theme;
      this.type = 'theme';
    }
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
    this.restService.save(this.echosForm.value, 'hist/nodes', {id_node_parent: this.id_node_parent}, 'id_node').subscribe((form) => {
      this.goBack();
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    this.restService.delete(id, 'hist/nodes').subscribe((response) => {
       this.router.navigate(['theme/liste']);
    }, (err) => {
      console.error(err);
    });
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
