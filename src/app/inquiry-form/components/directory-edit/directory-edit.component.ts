import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Node, NodeHist } from '../../inquiry-form';
import { RestService} from '../../services/rest.service';

@Component({
  templateUrl: './directory-edit.component.html',
  styleUrls: ['./directory-edit.component.scss']
})
export class DirectoryEditComponent implements OnInit {

  echosForm: FormGroup;
  current: any;
  idCtrl: FormControl;
  titleCtrl: FormControl;
  descriptionCtrl: FormControl;
  positionCtrl: FormControl;

  private id: number;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {

    this.current = new Node();

    this.idCtrl = fb.control(this.id);
    this.titleCtrl = fb.control(this.current.title, [Validators.required, Validators.minLength(3)]);
    this.descriptionCtrl = fb.control(this.current.description);
    this.positionCtrl = fb.control(this.current.position);

    this.echosForm = fb.group({
      id: this.idCtrl,
      title: this.titleCtrl,
      description: this.descriptionCtrl,
      position: this.positionCtrl,
    });

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.get();
    }
  }

  get() {
      this.restService.get(this.id, 'directories').subscribe(item => {
        this.echosForm.patchValue(item);
        this.current = item;
      }, (err) => {
        console.error(err);
      });
  }

  save() {
    this.restService.save(this.echosForm.value, 'directories').subscribe((InquiryForm) => {
      this.router.navigate(['/questionnaire', InquiryForm.id]);
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    this.restService.delete(id, 'directories').subscribe((response) => {
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
