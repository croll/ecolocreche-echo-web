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
  themeList: any;
  audit2QuestionList: any;
  audit1ChartDatas: any;
  audit2ChartDatas: any;
  audit1Cache: any;
  audit2Cache: any;
  chartType: string = 'pie';
  hideChart: boolean = false;
  charts: any = {};

  auditTools = AuditTools.getInstance();

  @ViewChild( BaseChartDirective ) private _chart;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService) {
    let tmp1 = this.route.snapshot.data['infos'][0];
    let tmp2 = this.route.snapshot.data['infos'][1];
    if (new Date(tmp1.audit.createdAt) < new Date(tmp2.audit.createdAt)) {
      this.audit1 = tmp1;
      this.audit2 = tmp2;
    } else {
      this.audit1 = tmp2;
      this.audit2 = tmp1;
    }
    this.audit1Cache  = this.auditTools.cacheDatas(this.audit1.nodes);
    this.audit2Cache  = this.auditTools.cacheDatas(this.audit2.nodes);
    console.log(this.audit1Cache);
    this.themeList = this.auditTools.merge(this.audit1Cache.chartDatas.themes, this.audit2Cache.chartDatas.themes);

    this.charts.environment = {
      audit1: this.auditTools.toChartDatas('pie', this.audit1Cache.chartDatas.families, 'environnementales'),
      audit2: this.auditTools.toChartDatas('pie', this.audit2Cache.chartDatas.families, 'environnementales'),
      global: this.auditTools.toChartDatas('bar', [this.audit1Cache.chartDatas.families, this.audit2Cache.chartDatas.families], 'environnementales'),
      radar: this.auditTools.toChartDatas('radar', [this.audit1Cache.chartDatas.themes, this.audit2Cache.chartDatas.themes], 'environnementales'),
      themes: []
    };

    this.charts.social = {
      audit1: this.auditTools.toChartDatas('pie', this.audit1Cache.chartDatas.families, 'sociales'),
      audit2: this.auditTools.toChartDatas('pie', this.audit2Cache.chartDatas.families, 'sociales'),
      global: this.auditTools.toChartDatas('bar', [this.audit1Cache.chartDatas.families, this.audit2Cache.chartDatas.families], 'sociales'),
      radar: this.auditTools.toChartDatas('radar', [this.audit1Cache.chartDatas.themes, this.audit2Cache.chartDatas.themes], 'sociales'),
      themes: []
    };

    for (let theme_id in this.audit1Cache.chartDatas.themes) {
      let family = (this.audit1Cache.chartDatas.themes[theme_id].family == 'environnementales') ? 'environment' : 'social';
      this.charts[family].themes.push({title: this.audit1Cache.chartDatas.themes[theme_id].title, chart: this.auditTools.toChartDatas('bar', [this.audit1Cache.chartDatas.themes, this.audit2Cache.chartDatas.themes], theme_id)});
    }

    console.log(this.charts);

  }

  ngOnInit() {
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
