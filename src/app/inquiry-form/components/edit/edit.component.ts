import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm } from '../../inquiry-form';
import { RestService} from '../../services/rest.service';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  echosForm: FormGroup;
  current: InquiryForm;
  idCtrl: FormControl;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;
  positionCtrl: FormControl;

  private id: number;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService) {

    this.current = new InquiryForm();

    this.idCtrl = fb.control(this.id);
    this.nameCtrl = fb.control(this.current.name, [Validators.required, Validators.minLength(3)]);
    this.descriptionCtrl = fb.control(this.current.position);
    this.positionCtrl = fb.control(this.current.description);

    this.echosForm = fb.group({
      id: this.idCtrl,
      name: this.nameCtrl,
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
      this.restService.get(this.id).subscribe(item => {
        this.echosForm.patchValue(item);
        this.current = item;
      }, (err) => {
        console.error(err);
      });
  }

  save() {
    this.restService.save(this.echosForm.value).subscribe((InquiryForm) => {
      this.router.navigate(['/questionnaire', InquiryForm.id]);
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    this.restService.delete(id).subscribe((response) => {
      this.router.navigate(['/questionnaire/liste']);
    }, (err) => {
      console.error(err);
    });
  }

}
