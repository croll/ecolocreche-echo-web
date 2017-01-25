import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { RestService } from '../../services/rest.service';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  //providers: [ RestService ],
})
export class EditComponent implements OnInit {

  echosForm: FormGroup;
  current: User;
  idCtrl: FormControl;
  nameCtrl: FormControl;
  emailCtrl: FormControl;
  typeCtrl: FormControl;

  private id: number;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService) {

    this.current = new User();

    this.idCtrl = fb.control(this.id);
    this.nameCtrl = fb.control(this.current.name, [Validators.required, Validators.minLength(3)]);
    this.typeCtrl = fb.control(this.current.account_type);
    this.emailCtrl = fb.control(this.current.email);

    this.echosForm = fb.group({
      id: this.idCtrl,
      name: this.nameCtrl,
      email: this.emailCtrl,
      account_type: this.typeCtrl,
    });

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.restService.get(this.id).subscribe(item => {
        this.echosForm.patchValue(item);
        this.current = item;
      });
    }
  }

  save() {
    this.restService.save(this.echosForm.value).subscribe((user) => {
      this.router.navigate(['/utilisateur', user.id]);
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    this.restService.delete(id).subscribe((response) => {
      this.router.navigate(['/utilisateurs/liste']);
    }, (err) => {
      console.error(err);
    });
  }


}
