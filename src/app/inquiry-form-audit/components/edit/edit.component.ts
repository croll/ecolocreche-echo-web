import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm } from '../../../common/models/inquiry-form';
import { RestService } from '../../../rest.service';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  echosForm: FormGroup;
  current: InquiryForm;
  idInquiryFormCtrl: FormControl;
  titleCtrl: FormControl;
  descriptionCtrl: FormControl;
  commentCtrl: FormControl;
  positionCtrl: FormControl;
  inquiryTypeCtrl: FormControl;

  id_inquiryform: number;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {

    this.current = new InquiryForm();
    this.current.inquiry_type = InquiryForm.Inquiry_type.Audit;

    this.idInquiryFormCtrl = fb.control(this.id_inquiryform);
    this.titleCtrl = fb.control(this.current.title, [Validators.required, Validators.minLength(3)]);
    this.descriptionCtrl = fb.control(this.current.description);
    this.commentCtrl = fb.control(this.current.comment);
    this.positionCtrl = fb.control(this.current.position);

    this.echosForm = fb.group({
      id_inquiryform: this.idInquiryFormCtrl,
      title: this.titleCtrl,
      description: this.descriptionCtrl,
      comment: this.commentCtrl,
      position: this.positionCtrl,
    });

  }

  ngOnInit() {
    this.id_inquiryform = this.route.snapshot.params['id'];
    if (this.id_inquiryform) {
      this.get();
    }
  }

  get() {
      this.restService.get(this.id_inquiryform, 'hist/inquiryforms').subscribe(item => {
        this.echosForm.patchValue(item);
        this.current = item;
      }, (err) => {
        console.error(err);
      });
  }

  save() {
    this.restService.save(Object.assign(this.current, this.echosForm.value), 'hist/inquiryforms', null, 'id_inquiryform').subscribe((InquiryForm) => {
      this.router.navigate(['/questionnaire', InquiryForm.id_inquiryform]);
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    if (confirm("Souhaitez vous vraiment supprimer ce questionnaire ?")) {
      this.restService.delete(this.id_inquiryform, 'hist/inquiryforms').subscribe((response) => {
        this.router.navigate(['/questionnaire/liste']);
      }, (err) => {
        console.error(err);
      });
    }
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
