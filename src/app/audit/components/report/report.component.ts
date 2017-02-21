import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../../inquiry-form/inquiry-form';
import { Node } from '../../../node/node';
import { RestService } from '../../../rest.service';
import * as moment from 'moment'


@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  private id_inquiryform: number;
  parentNodes: any[] = [];
  filteredChildList: any[];
  node: any;
  infos: any;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.infos = this.route.snapshot.data['infos'];
    let audit1 = this._cacheQuestions(this.infos.nodes);
    console.log(this.infos);
    console.log(audit1);
  }

  ngOnInit() {
    this.node = this.infos.nodes;
    this.filteredChildList = this.node.childs;
  }

  filterList(filter?) {
    this.filteredChildList = filter ? this.node.childs.filter(item => item.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1) : this.node.childs;
  }

  _cacheQuestions(nodes, questionsList = []) {
    if (nodes.childs && nodes.childs.length) {
      nodes.childs.forEach(node => {
        this._cacheQuestions(node, questionsList);
        if (node.type.substring(0, 2) == 'q_') {
          let question = {id: node.id, id_node: node.id_node, title: node.title, comment: node.comment, type: node.type, ignored: false, choices: null, value: null};
          if (node.answer) {
            if (!node.answer.ignored) {
              let value = JSON.parse(node.answer.value);
              // Checkboxes
              if (node.type == 'q_checkbox' || node.type == 'q_percents') {
                question.choices = [];
                for(let id_choice in value) {
                  node.choices.forEach(c => {
                    // console.log(node.type, parseInt(id_choice), c.id_choice);
                    if (parseInt(id_choice) == c.id_choice) {
                      question.choices.push({title: c.title, impact: c.impact, comment: c.comment, value: value[id_choice]});
                    }
                  });
                }
              } else if (node.type == 'q_radio'){
                question.choices = [];
                node.choices.forEach(c => {
                  if (value == c.id_choice) {
                    question.choices.push({title: c.title, impact: c.impact, comment: c.comment});
                  }
                });
              } else {
                question.value = value;
              }
            } else {
              question.ignored = true;
            }
          }
          questionsList.push(question);
        }
      });
    }
    return questionsList;
  }

}
