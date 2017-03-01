import { Component, OnInit, OnDestroy, HostBinding, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../../inquiry-form/inquiry-form';
import { Node } from '../../../node/node';
import { RestService } from '../../../rest.service';
import { AuditTools } from '../../components/abstracts/audit-tools';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';

import * as moment from 'moment';

@Component({
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {

  private id_inquiryform: number;
  node: any;
  audit1: any;
  audit2: any;
  questionList: any;
  audit2QuestionList: any;
  audit1ChartDatas: any;
  audit2ChartDatas: any;
  audit1Cache: any;
  audit2Cache: any;
  chartType: string = 'pie';
  hideChart: boolean = false;

  auditTools = AuditTools.getInstance();

  @ViewChild( BaseChartDirective ) private _chart;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    console.log(this.route.snapshot.data['infos']);
    this.audit1 = this.route.snapshot.data['infos'][0];
    this.audit2 = this.route.snapshot.data['infos'][1];
    this.audit1Cache  = this.auditTools.cacheDatas(this.audit1.nodes);
    this.audit2Cache  = this.auditTools.cacheDatas(this.audit2.nodes);
    this.questionList = this.auditTools.mergeQuestions(this.audit1Cache.questionList, this.audit1Cache.questionList);
    this.audit1ChartDatas = this.auditTools.generateChartDatas(this.chartType, this.audit1Cache.chartDatas);
    this.audit2ChartDatas = this.auditTools.generateChartDatas(this.chartType, this.audit2Cache.chartDatas);
  }

  ngOnInit() {
    // this.node = this.infos.nodes;
  }

  setChartType(chartType, id_theme) {
    this.chartType = chartType.value;
    // Object.assign(this.chartDatas[id_theme], this.auditTools.toChartDatas(this.chartType, this.cache.chartDatas[id_theme]));
    // Object.assign(this.chartDatas[id_theme], this.auditTools.toChartDatas(this.chartType, this.cache.chartDatas[id_theme]));
    setTimeout(() => {
      this._chart.ngOnChanges({});
    }, 150);
  }

  toggleChartType(chartType, id_theme) {
    this.hideChart = true;
    chartType = (chartType == 'bar') ? 'pie' : 'bar';
    // Object.assign(this.chartDatas[id_theme], this.auditTools.toChartDatas(chartType, this.cache.chartDatas[id_theme]));
    setTimeout(() => {
      this.hideChart = false;
      this._chart.ngOnChanges({});
      // this._chart.refresh();
    }, 0);
  }

}
