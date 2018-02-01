import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Audit } from '../../../common/models/audit';
import { RestService} from '../../../rest.service';
import { InquiryForm } from '../../../common/models/inquiry-form';
import { Http, Response } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../auth.service';
import { CustomValidators } from '../../../custom.validators';

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
  dateStartCtrl: FormControl;
  showCreationDateField: boolean;

  id: number;
  id_establishment: number;
  inquiryFormList: InquiryForm[];

  key: string;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location, private http: Http, private snackBar: MatSnackBar, public authService: AuthService) {

    this.current = new Audit();
    this.current.inquiry_type = InquiryForm.Inquiry_type.Audit;

    this.id = this.route.snapshot.params['id'];
    this.infos = this.route.snapshot.data['infos']['idOrKey'];

  }

  ngOnInit() {
    this._getFormList();

    let datePipe = new DatePipe("fr-FR");

    if (this.infos && this.infos.audit) {
      Object.assign(this.current, this.infos.audit)
      this.current.date_start = datePipe.transform(this.current.date_start, 'dd/MM/yyyy H:mm');
      this.id_establishment = this.infos.audit.establishment.id;
      this.showCreationDateField = true;
    } else {
      this.current.active = 1;
      this.current.date_start = datePipe.transform(Date.now(), 'dd/MM/yyyy H:mm');
      this.id_establishment = this.route.snapshot.params['id_establishment'];
      this.showCreationDateField = false;
    }

    this.idCtrl = this.fb.control(this.id);

    this.idEstablishmentCtrl = this.fb.control(this.id_establishment, [Validators.required]);
    this.idInquiryFormCtrl = this.fb.control({value: this.current.id_inquiryform, disabled: this.id}, [Validators.required]);
    this.synthesisCtrl = this.fb.control(this.current.synthesis || '');
    this.activeCtrl = this.fb.control({value: this.current.active, disabled: !this.authService.isSuperAgent()}, [Validators.required]);
    this.keyCtrl = this.fb.control(this.current.key || this._generateKey(), [Validators.required]);
    this.dateStartCtrl = this.fb.control({value: this.current.date_start || new Date(), disabled: !this.authService.isAdmin()}, Validators.compose([Validators.required, CustomValidators.frenchDate]));

    this.echosForm = this.fb.group({
      id: this.idCtrl,
      id_establishment: this.idEstablishmentCtrl,
      id_inquiryform: this.idInquiryFormCtrl,
      synthesis: this.synthesisCtrl,
      active: this.activeCtrl,
      key: this.keyCtrl,
      date_start: this.dateStartCtrl
    });
  }

  private _getFormList() {
      this.restService.getList('hist/inquiryforms', {inquiry_type: this.current.inquiry_type}).subscribe(forms => {
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

  private _dateStringToObj(str) {
    if (!str) return null;
    let m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{2}):(\d{2}$)/);
    return new Date(m[3], parseInt(m[2])-1, m[1], m[4], m[5]);
  }

  save(event) {
    event.preventDefault();
    event.stopPropagation();
    this.echosForm.value.date_start = this._dateStringToObj(this.echosForm.value.date_start);
    this.restService.save(Object.assign(this.current, this.echosForm.value), 'audits').subscribe((audit) => {
      this.router.navigate(['/audit', audit.key]);
    }, (err) => {
      console.error(err);
    });
    return false;
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
    event.stopPropagation();
    this.echosForm.value.date_start = this._dateStringToObj(this.echosForm.value.date_start);
    this.restService.save(Object.assign(this.current, this.echosForm.value), 'audits').subscribe((audit) => {
      this.router.navigate(['/etablissement', this.infos.audit.id_establishment]);
    }, (err) => {
      console.error(err);
    });
    return false;
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
