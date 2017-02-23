import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../../inquiry-form/inquiry-form';
import { Node } from '../../../node/node';
import { RestService } from '../../../rest.service';
import { AuditTools } from '../../components/abstracts/audit-tools';
import { ChartsModule } from 'ng2-charts';
import * as moment from 'moment';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  private id_inquiryform: number;
  node: any;
  infos: any;
  questionList: any;
  themeImpact: any;
  cache: any;
  charts: any;

  auditTools = AuditTools.getInstance();

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    this.infos = this.route.snapshot.data['infos'];
    this.cache  = this.auditTools.cacheDatas(this.infos.nodes);
    this.questionList = this.cache.questionList;
    this.themeImpact = this.auditTools.generateChartDatas('bar', this.cache.themeImpact);
  }

  ngOnInit() {
    this.node = this.infos.nodes;
  }

  setChartType(chartType) {
    this.themeImpact = this.auditTools.generateChartDatas(chartType.value, this.cache.themeImpact);
  }

}
