import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm } from '../../../common/models/inquiry-form';
import { RestService } from '../../../rest.service';

const default_audit_mail_from = ``;
const default_audit_mail_subject = `ECHO(S): Audit de {establishment_name}`;
const default_audit_mail_body = `Bonjour,

Voici le lien vers l'audit concernant l'établissement {establishment_name}.

{audit_url}

Cordialement,

Echo(s)
`;

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
  mailFromCtrl: FormControl;
  mailTitleCtrl: FormControl;
  mailBodyCtrl: FormControl;
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
    this.mailFromCtrl = fb.control(this.current.mail_from ? this.current.mail_from : default_audit_mail_from);
    this.mailTitleCtrl = fb.control(this.current.mail_title ? this.current.mail_title : default_audit_mail_subject);
    this.mailBodyCtrl = fb.control(this.current.mail_body ? this.current.mail_body : default_audit_mail_body);

    this.echosForm = fb.group({
      id_inquiryform: this.idInquiryFormCtrl,
      title: this.titleCtrl,
      description: this.descriptionCtrl,
      comment: this.commentCtrl,
      position: this.positionCtrl,
      mail_from: this.mailFromCtrl,
      mail_title: this.mailTitleCtrl,
      mail_body: this.mailBodyCtrl,
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
