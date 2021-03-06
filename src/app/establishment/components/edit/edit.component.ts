import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Establishment } from '../../establishment';
import { RestService} from '../../../rest.service';

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

    let instance = new Establishment();

    if (this.route.snapshot.data['infos']) {
      this.current = Object.assign(instance, this.route.snapshot.data['infos']);
    } else {
      this.current = instance;
    }

    this.idCtrl = fb.control(this.current.id);
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
  }

  save() {
    this.restService.save(this.echosForm.value, 'establishments', undefined, 'id', "Sauvegarde de l'établissement : ").subscribe((establishment) => {
      this.router.navigate(['/etablissement', establishment.id]);
    }, (err) => {
      console.error(err);
    });
    return false;
  }

  delete(id) {
    if (confirm("Souhaitez vous vraiment supprimer cet établissement ?")) {
      this.restService.delete(id, 'establishments', "Suppression de l'établissement : ").subscribe((response) => {
        this.router.navigate(['/etablissement/liste']);
      }, (err) => {
        console.error(err);
      });
    }
    return false;
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
