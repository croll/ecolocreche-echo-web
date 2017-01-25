import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Establishment } from '../../establishment';
import { RestService} from '../../services/rest.service';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  echosForm: FormGroup;
  current: Establishment;
  idCtrl: FormControl;
  nameCtrl: FormControl;
  addressCtrl: FormControl;
  postalcodeCtrl: FormControl;
  cityCtrl: FormControl;
  phoneCtrl: FormControl;
  mailCtrl: FormControl;
  typeCtrl: FormControl;
  statusCtrl: FormControl;

  private id: number;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {

    this.current = new Establishment();

    this.idCtrl = fb.control(this.id);
    this.nameCtrl = fb.control(this.current.name, [Validators.required, Validators.minLength(3)]);
    this.typeCtrl = fb.control(this.current.type, [Validators.required]);
    this.statusCtrl = fb.control(this.current.status, [Validators.required]);
    this.addressCtrl = fb.control(this.current.address);
    this.postalcodeCtrl = fb.control(this.current.postalcode);
    this.cityCtrl = fb.control(this.current.city);
    this.phoneCtrl = fb.control(this.current.phone);
    this.mailCtrl = fb.control(this.current.mail);

    this.echosForm = fb.group({
      id: this.idCtrl,
      name: this.nameCtrl,
      address: this.addressCtrl,
      postalcode: this.postalcodeCtrl,
      city: this.cityCtrl,
      phone: this.phoneCtrl,
      mail: this.mailCtrl,
      type: this.typeCtrl,
      status: this.statusCtrl
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
    this.restService.save(this.echosForm.value).subscribe((establishment) => {
      this.router.navigate(['/etablissement', establishment.id]);
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    this.restService.delete(id).subscribe((response) => {
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
