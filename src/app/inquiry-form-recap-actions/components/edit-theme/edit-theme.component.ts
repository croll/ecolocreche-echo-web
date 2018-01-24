import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm } from '../../../common/models/inquiry-form';
import { RestService } from '../../../rest.service';

@Component({
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})

export class EditThemeComponent implements OnInit {

  echosForm: FormGroup;
  current: InquiryForm;
  idRecapActionsCtrl: FormControl;
  titleCtrl: FormControl;
  descriptionCtrl: FormControl;
  idThemeCtrl: FormControl;
  mailTitleCtrl: FormControl;
  mailBodyCtrl: FormControl;

  id_inquiryform: number;
  id_theme: number;
  themesList: InquiryForm[] = [];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {

    this.current = new this.route.snapshot.data['inquiryForm'];
    this.current.inquiry_type = InquiryForm.Inquiry_type.RecapAction;

    this.inquiryform = this.route.snapshot.data['inquiryForm'];

    this.node = new Node();
    this.node.childs = this.route.snapshot.data['inquiryFormTree']
    this.filteredChildList = this.node.childs;

    this.idRecapActionsCtrl = fb.control(this.id_inquiryform);
    this.titleCtrl = fb.control(this.current.title, [Validators.required, Validators.minLength(3)]);
    this.descriptionCtrl = fb.control(this.current.description);
    this.idThemeCtrl = fb.control(this.current.description);
    this.mailTitleCtrl = fb.control(this.current.mail_title ? this.current.mail_title : default_recapaction_mail_subject);
    this.mailBodyCtrl = fb.control(this.current.mail_body ? this.current.mail_body : default_recapaction_mail_body);

    this.echosForm = fb.group({
      id_inquiryform: this.idRecapActionsCtrl,
      title: this.titleCtrl,
      description: this.descriptionCtrl,
      id_theme: this.idThemeCtrl,
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
    this.restService.save(Object.assign(this.current, this.echosForm.value), 'hist/inquiryforms', null, 'id_inquiryform').subscribe((RecapActions) => {
      this.router.navigate(['/recap-actions', RecapActions.id_inquiryform]);
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    if (confirm("Souhaitez vous vraiment supprimer ce dossier recap actions ?")) {
      this.restService.delete(this.id_inquiryform, 'hist/inquiryforms').subscribe((response) => {
        this.router.navigate(['/recap-actions/liste']);
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
