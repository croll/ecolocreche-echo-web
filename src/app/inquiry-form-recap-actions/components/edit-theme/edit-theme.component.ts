import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm } from '../../../common/models/inquiry-form';
import { Node } from '../../../common/models/node';
import { RestService } from '../../../rest.service';

@Component({
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})

export class EditThemeComponent implements OnInit {

  echosForm: FormGroup;
  idRecapActionsCtrl: FormControl;
  idThemeCtrl: FormControl;
  titleCtrl: FormControl;
  linkedToNodeIdCtrl: FormControl;
  id_inquiryform: number;
  item: Node;
  inquiryFormThemes: InquiryForm[] = [];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {

    this.item = new Node();
    this.item.inquiry_type = Node.Inquiry_type.RecapAction;

    this.idRecapActionsCtrl = fb.control(this.id_inquiryform);
    this.titleCtrl = fb.control(this.item.title, [Validators.required, Validators.minLength(3)]);
    this.linkedToNodeIdCtrl = fb.control(this.item.linked_to_node_id);

    this.echosForm = fb.group({
      title: this.titleCtrl,
      linked_to_node_id: this.linkedToNodeIdCtrl,
    });

  }

  ngOnInit() {
    this.item.id_node = this.route.snapshot.params['id_theme'] || null;
    this.inquiryFormThemes = this.route.snapshot.data['inquiryFormThemes']
    if (this.route.snapshot.data['recapActionsTheme']) {
      this.item = this.route.snapshot.data['recapActionsTheme'];
      this.echosForm.patchValue(this.item);
    }
  }

  save() {
    this.restService.save(Object.assign(this.item, this.echosForm.value), 'hist/nodes', null, 'id_node').subscribe((RecapActions) => {
      this.goBack();
    }, (err) => {
      console.error(err);
    });
  }

  delete(id) {
    if (confirm("Souhaitez vous vraiment supprimer ce dossier recap actions ?")) {
      this.restService.delete(this.item.id_node, 'hist/nodes').subscribe((response) => {
        this.router.navigate(['/recap-actions/liste']);
      }, (err) => {
        console.error(err);
      });
    }
  }

  unsetNodeLink() {
    this.linkedToNodeIdCtrl.setValue(null);
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
