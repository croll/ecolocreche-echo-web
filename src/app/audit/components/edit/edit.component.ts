import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Audit } from '../../audit';
import { RestService} from '../../../rest.service';
import { InquiryForm } from '../../../inquiry-form/inquiry-form';
import { Http, Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { AuthService } from '../../../auth.service';

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
  infos: any;

  private id: number;
  private id_establishment: number;
  private inquiryFormList: InquiryForm[];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location, private http: Http, private snackBar: MdSnackBar, public authService: AuthService) {

    this.current = new Audit();

    this.id = this.route.snapshot.params['id'];
    this.infos = this.route.snapshot.data['infos'];
    console.log(this.infos);

  }

  ngOnInit() {
    this._getFormList();

    if (this.infos && this.infos.audit) {
      Object.assign(this.current, this.infos.audit)
      this.id_establishment = this.infos.audit.establishment.id;
    } else {
      this.current.active = 1;
      this.id_establishment = this.route.snapshot.params['id_establishment'];
    }

    this.idCtrl = this.fb.control(this.id);

    this.idEstablishmentCtrl = this.fb.control(this.id_establishment, [Validators.required]);
    this.idInquiryFormCtrl = this.fb.control({value: this.current.id_inquiryform, disabled: this.id}, [Validators.required]);
    this.synthesisCtrl = this.fb.control(this.current.synthesis || '');
    this.activeCtrl = this.fb.control({value: this.current.active, disabled: !this.authService.isSuperAgent()}, [Validators.required]);
    this.keyCtrl = this.fb.control(this.current.key || this._generateKey(), [Validators.required]);

    this.echosForm = this.fb.group({
      id: this.idCtrl,
      id_establishment: this.idEstablishmentCtrl,
      id_inquiryform: this.idInquiryFormCtrl,
      synthesis: this.synthesisCtrl,
      active: this.activeCtrl,
      key: this.keyCtrl
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
    this.restService.save(this.echosForm.value, 'audits').subscribe((establishment) => {
      this.goBack();
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    if (confirm("Souhaitez vous vraiment supprimer cet audit ?")) {
      this.restService.delete(id, 'audits').subscribe((response) => {
        this.router.navigate(['/etablissement/liste']);
      }, (err) => {
        console.error(err);
      });
    }
    return false;
  }

  sendmail(id) {
    this.http.post('/rest/auditmail', {
      id_audit: id,
    }).subscribe(() => {
      this.snackBar.open("Mail de l'audit : ", "ENVOYÉ", {
            duration: 3000,
          });
    })
    return false;
  }

  saveAndGoToEstablishment(event) {
    event.preventDefault();
    this.restService.save(this.echosForm.value, 'audits').subscribe((establishment) => {
      this.router.navigate(['/etablissement', this.infos.audit.id_establishment]);
    }, (err) => {
      console.error(err);
    });
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
