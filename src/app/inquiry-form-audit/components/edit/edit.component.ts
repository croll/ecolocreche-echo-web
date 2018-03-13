import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm } from '../../../common/models/inquiry-form';
import { RestService } from '../../../rest.service';
import { QuillConfigInterface } from 'ngx-quill-wrapper';

const default_audit_mail_from = ``;
const default_audit_mail_subject = `ECHO(S): Audit de {establishment_name}`;
const default_audit_mail_body = `Bonjour,

Voici le lien vers l'audit concernant l'établissement {establishment_name}.

{audit_url}

Cordialement,

Echo(s)
`;

const default_audit_report_header = `<h1>Rapport de l'audit de {establishment_name}</h1>

<ul>
<li>Date de création de l'audit : {audit_date_start}</li>
<li>Finalisé le : {audit_date_end}</li>
</ul>
`;

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {

  quillconfig: QuillConfigInterface = {
    theme: 'bubble',
    modules: {
      toolbar: true,
    },
    placeholder: "Gabarit d'entête",
  };

  echosForm: FormGroup;
  current: InquiryForm;
  idInquiryFormCtrl: FormControl;
  titleCtrl: FormControl;
  descriptionCtrl: FormControl;
  commentCtrl: FormControl;
  positionCtrl: FormControl;
  mailFromCtrl: FormControl;
  mailSubjectCtrl: FormControl;
  mailBodyCtrl: FormControl;
  inquiryTypeCtrl: FormControl;
  auditReportHeaderCtrl: FormControl;
  audit_report_header_value: string;

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
    this.mailSubjectCtrl = fb.control(this.current.mail_subject ? this.current.mail_subject : default_audit_mail_subject);
    this.mailBodyCtrl = fb.control(this.current.mail_body ? this.current.mail_body : default_audit_mail_body);
    this.auditReportHeaderCtrl = fb.control(this.current.audit_report_header && this.current.audit_report_header.length > 0 ? this.current.audit_report_header : default_audit_report_header);

    this.echosForm = fb.group({
      id_inquiryform: this.idInquiryFormCtrl,
      title: this.titleCtrl,
      description: this.descriptionCtrl,
      comment: this.commentCtrl,
      position: this.positionCtrl,
      mail_from: this.mailFromCtrl,
      mail_subject: this.mailSubjectCtrl,
      mail_body: this.mailBodyCtrl,
      audit_report_header: this.auditReportHeaderCtrl,
    });

  }

  ngOnInit() {
    this.id_inquiryform = this.route.snapshot.params['id'];
    if (this.id_inquiryform) {
      this.get();
    }
  }

  get audit_report_header() {
    return this.auditReportHeaderCtrl.value;
  }
  set audit_report_header(val) {
    if (val == null) val = "";
    this.auditReportHeaderCtrl.setValue(val);
  }

  get() {
      this.restService.get(this.id_inquiryform, 'hist/inquiryforms').subscribe(item => {
        item.current=item;
        if (!item.current.mail_from) item.current.mail_from=default_audit_mail_from;
        if (!item.current.mail_subject) item.current.mail_subject=default_audit_mail_subject;
        if (!item.current.mail_body) item.current.mail_body=default_audit_mail_body;
        if (!item.current.audit_report_header) item.current.audit_report_header=default_audit_report_header;
        console.log("item: ", item);
        this.echosForm.patchValue(item);
      }, (err) => {
        console.error(err);
      });
  }

  save() {
    console.log("saving...");
    this.restService.save(Object.assign(this.current, this.echosForm.value), 'hist/inquiryforms', null, 'id_inquiryform').subscribe((InquiryForm) => {
      this.router.navigate(['/questionnaire', InquiryForm.id_inquiryform]);
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    event.stopPropagation();
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
