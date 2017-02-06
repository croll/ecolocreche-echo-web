import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Audit } from '../../audit';
import { RestService} from '../../../rest.service';
import { InquiryForm } from '../../../inquiry-form/inquiry-form';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  echosForm: FormGroup;
  current: Audit;
  idCtrl: FormControl;
  idEstablishmentCtrl: FormControl;
  idInquiryFormCtrl: FormControl;
  synthesisCtrl: FormControl;
  activeCtrl: FormControl;
  keyCtrl: FormControl;

  private id: number;
  private id_establishment: number;
  private inquiryFormList: InquiryForm[];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {

    this.current = new Audit();

    this.idCtrl = fb.control(this.id);
    this.idEstablishmentCtrl = fb.control(this.id_establishment, [Validators.required]);
    this.idInquiryFormCtrl = fb.control({value: this.current.id_inquiryform, disabled: this.id}, [Validators.required]);
    this.synthesisCtrl = fb.control(this.current.synthesis || '');
    this.activeCtrl = fb.control(this.current.active || 1, [Validators.required]);
    this.keyCtrl = fb.control(this.current.key || this._generateKey(), [Validators.required]);

    this.echosForm = fb.group({
      id: this.idCtrl,
      id_establishment: this.idEstablishmentCtrl,
      id_inquiryform: this.idInquiryFormCtrl,
      synthesis: this.synthesisCtrl,
      active: this.activeCtrl,
      key: this.keyCtrl
    });

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.id_establishment = this.route.snapshot.params['id_establishment'];
    this._getFormList();
    console.log(new Date().getTime()+''+Math.random());
    if (this.id) {
      this.get();
    } else {
      this.echosForm.patchValue({id_establishment: this.id_establishment, active: 1});
    }
  }

  get() {
      this.restService.get(this.id, 'audits').subscribe(item => {
        this.echosForm.patchValue(item);
        this.current = Object.assign(this.current, item);
      }, (err) => {
        console.error(err);
      });
  }

  private _getFormList() {
      this.restService.getList('hist/inquiryforms').subscribe(forms => {
        this.inquiryFormList = forms;
      }, (err) => {
        console.error(err);
      });
  }

  private _generateKey() {
    let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  save() {
    console.log(this.echosForm.value);
    this.restService.save(this.echosForm.value, 'audits').subscribe((establishment) => {
      this.router.navigate(['/etablissement', this.id_establishment]);
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    this.restService.delete(id, 'audits').subscribe((response) => {
      this.router.navigate(['/etablissement/liste']);
    }, (err) => {
      console.error(err);
    });
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
