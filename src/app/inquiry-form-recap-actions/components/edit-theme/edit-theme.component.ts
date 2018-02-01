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
  titleCtrl: FormControl;
  linkedToNodeIdCtrl: FormControl;
  item: Node;
  inquiryFormThemes: Node[] = [];
  inquiryform: InquiryForm;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private restService: RestService, private location: Location) {

    this.item = new Node();
    this.item.inquiry_type = Node.Inquiry_type.RecapAction;

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
    this.inquiryform = this.route.snapshot.data['inquiryForm']
    if (!this.inquiryform.nodeslist) {
      this.inquiryform.nodeslist = '[]';
    }
    if (this.route.snapshot.data['recapActionsTheme']) {
      this.item = this.route.snapshot.data['recapActionsTheme'];
      this.echosForm.patchValue(this.item);
    }
  }

  save() {
    this.restService.save(Object.assign(this.item, this.echosForm.value), 'hist/nodes', {id_inquiryform: this.inquiryform.id_inquiryform}, 'id_node').subscribe((RecapActions) => {
      if (!this.item.id_node) {
        //this.updateNodeslist(RecapActions.id_node, 'add');
      } else {
        this.goBack();
      }
    }, (err) => {
      console.error(err);
    });
  }

  delete() {
    if (confirm("Souhaitez vous vraiment supprimer ce thème ?")) {
	  this.restService.delete(this.item.id_node, 'hist/nodes', {id_inquiryform: this.inquiryform.id}).subscribe((response) => {
        // this.updateNodeslist(this.item.id_node, 'delete');
      }, (err) => {
        console.error(err);
      });
    }
  }

/*
  updateNodeslist(id, action) {
    if (!id) {
      return false;
    }
    var nl = JSON.parse(this.inquiryform.nodeslist);
    if (action == 'delete') {
      let pos = nl.indexOf(id);
      if (pos !== -1) {
        nl.splice(pos, 1);
      }
    } else {
      nl.push(id);
    }
    this.inquiryform.nodeslist = JSON.stringify(nl);
    this.restService.save(this.inquiryform, 'hist/inquiryforms', null, 'id_inquiryform').subscribe((InquiryForm) => {
      this.goBack();
    }, (err) => {
      console.error(err);
    });
  }
*/
*
  unsetNodeLink() {
    this.linkedToNodeIdCtrl.setValue(null);
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
