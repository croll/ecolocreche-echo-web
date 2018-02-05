import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InquiryForm, InquiryFormExt } from '../../../common/models/inquiry-form';
import { Node } from '../../../common/models/node';
import { RestService } from '../../../rest.service';
import { AuthService } from '../../../auth.service';
import { Answer } from '../../../question/answer';
import { QuillConfigInterface } from 'ngx-quill-wrapper';



@Component({
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent {

  infos: any;
  themes: any;


  public config: QuillConfigInterface = {
   theme: 'bubble',  
   modules: {
    toolbar: true
  },
  placeholder: 'Votre commentaire...'
 };

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, public authService: AuthService, private location: Location) {
    this.infos = this.route.snapshot.data['infos']['idOrKey'];

    // work on a copy
    this.themes = JSON.parse(JSON.stringify(this.infos.nodes.childs));

    // Init answers
    this.themes.forEach(theme => {
      theme.childs.forEach(question => {
        if (!(question.answer)) {
          // generate answer
          question.answer = Object.assign(new Answer(), {id_audit: this.infos.audit.id, audit_key: this.infos.audit.key, id_node: question.id_node, ignored: false, value: "", comment: ""});
        } else {
          // clean answer
          if (question.answer.value == '{}') {
            question.answer.value = '';
          }
        }
        // cache responses to check if response if different when saving
        question.answer.originalValue = question.answer.value;
      });
    });
  }

  save() {

    this.themes.forEach(theme => {
      theme.childs.forEach(question => {
        // Check if response is different to original value
        if (question.answer.value != question.answer.originalValue) {
          delete question.answer.originalValue;
          this.restService.save(question.answer, 'answers/'+question.answer.id_audit+'/'+question.answer.id_node, {}, "HACK TO ALWAYS DO A CREATE, NOT UPDATE", "Sauvegade de la réponse : ", "Ok").subscribe(res => {
            console.log(res);
          });
        }
      });
    });

    return false;
  }

  delete() {
  }

  help() {
    alert('todo');
  }

  pdf() {
    alert('todo');
  }

  duplicate() {
    alert('todo');
  }

  goBack(): boolean {
    this.location.back();
    return false;
  }

}
