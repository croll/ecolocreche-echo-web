import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Establishment } from '../../establishment';
import { EstablishmentService} from '../../services/establishment.service';

@Component({
  selector: 'app-establishment-edit',
  templateUrl: './establishment-edit.component.html',
  styleUrls: ['./establishment-edit.component.scss']
})
export class EstablishmentEditComponent implements OnInit {

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

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private establishmentService: EstablishmentService) {

    this.current = new Establishment();

    // Hack to be removed
    this.current.status = 1;
    this.current.type = 1;

    this.idCtrl = fb.control(this.id);
    this.nameCtrl = fb.control(this.current.name, [Validators.required, Validators.minLength(3)]);
    this.typeCtrl = fb.control(this.current.type);
    this.statusCtrl = fb.control(this.current.status);
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
      this.establishmentService.get(this.id).subscribe(item => {
        this.current = item;
      });
    }
  }

  save() {
    console.log("SAVEUH", this.echosForm.value);
    this.establishmentService.save(this.echosForm.value).subscribe((establishment) => {
      this.router.navigate(['/etablissement', establishment.id]);
    }, (err) => {
      console.error(err);
    });
  }

}
