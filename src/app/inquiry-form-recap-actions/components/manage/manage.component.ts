import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm } from '../../../common/models/inquiry-form';
import { RestService } from '../../../rest.service';
import { AuthService } from '../../../auth.service';

const default_recapaction_mail_subject = `ECHO(S): Récap Action de {establishment_name}`;
const default_recapaction_mail_body = `Bonjour,

Voici le lien vers le récap action concernant l'établissement {establishment_name}.

{recapaction_url}

Cordialement,

Echo(s)
`;

@Component({
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManageComponent implements OnInit {

  item: InquiryForm;
  themesList: InquiryForm[] = [];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location, public authService: AuthService) {
    this.item = this.route.snapshot.data['inquiryForm'];
    this.themesList = this.route.snapshot.data['recapActionsThemes'];
    console.log("ICI");
    console.log(this.route.snapshot.data['recapActionsThemes']);
  }

  ngOnInit() {
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}