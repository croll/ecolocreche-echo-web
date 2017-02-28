import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../../auth.service';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [ RestService ],
})
export class EditComponent implements OnInit {

  typeList = [
      {
          label: "Administrateur",
          id: "admin",
      },
      {
          label: "Super Agent",
          id: "superagent",
      },
      {
          label: "Agent",
          id: "agent",
      },
  ];

  echosForm: FormGroup;
  current: User;
  idCtrl: FormControl;
  nameCtrl: FormControl;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  typeCtrl: FormControl;

  private id: number;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, public authService: AuthService, private location: Location) {

  }

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];

      this.current = new User();

      this.idCtrl = this.fb.control(this.id);
      this.nameCtrl = this.fb.control(this.current.name, [Validators.required, Validators.minLength(3)]);
      this.typeCtrl = this.fb.control(this.current.account_type);
      this.emailCtrl = this.fb.control(this.current.email);
      if (this.id) {
          this.passwordCtrl = this.fb.control(this.current.password, [Validators.minLength(6)]);
      } else {
          this.passwordCtrl = this.fb.control(this.current.password, [Validators.required, Validators.minLength(6)]);
      }

      this.echosForm = this.fb.group({
        id: this.idCtrl,
        name: this.nameCtrl,
        email: this.emailCtrl,
        account_type: this.typeCtrl,
        password: this.passwordCtrl,
      });


      if (this.id) {
        this.restService.get(this.id).subscribe(item => {
          this.echosForm.patchValue(item);
          this.current = item;
        });
      }
  }

  save() {
      console.log("save user...");
    this.restService.save(this.echosForm.value).subscribe((user) => {
      this.router.navigate(['/utilisateur', user.id]);
    }, (err) => {
      console.error(err);
    });
    return false;
  }

  del(id) {
    if (confirm("Souhaitez vous vraiment supprimer cet utilisateur ?")) {
      this.restService.delete(id).subscribe((response) => {
        this.router.navigate(['/utilisateur/liste']);
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
