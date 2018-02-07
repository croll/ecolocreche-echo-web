import { Component, OnInit, OnDestroy, HostBinding, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../../common/models/inquiry-form';
import { Node } from '../../../common/models/node';
import { RestService } from '../../../rest.service';
import { AuditTools } from '../../../common/abstracts/audit-tools';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';
import { ExportCSVService } from '../../export-csv.service';
import { PuppeteerPdfService } from '../../../puppeteerpdf.service';
import { LabelingFile } from '../../../common/models/labeling-file';
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
  logo: string = '';

  customisations = new LabelingFile.Json();

  auditTools = AuditTools.getInstance();

  @ViewChild( BaseChartDirective ) private _chart;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, private csvService: ExportCSVService, private puppeeterService: PuppeteerPdfService) {

  console.log(JSON.stringify(this.customisations));

    let tmp1 = this.route.snapshot.data['infos']['audit1'];
    let tmp2 = this.route.snapshot.data['infos']['audit2'];
    if (new Date(tmp1.audit.date_start) < new Date(tmp2.audit.date_start)) {
      this.audit1 = tmp1;
      this.audit2 = tmp2;
    } else {
      this.audit1 = tmp2;
      this.audit2 = tmp1;
    }
    this.audit1Cache  = this.auditTools.cacheDatas(this.audit1.nodes);
    this.audit2Cache  = this.auditTools.cacheDatas(this.audit2.nodes);
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

  }

  ngOnInit() {
    this.swapLogo();
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

  pdf() {
    console.log("TODO: replace 0 by the id of compare");
    this.puppeeterService.print('compare', 0);
  }

  exportCSV(format: string) {
    this.csvService.getContent(format, this.audit1Cache, this.audit2Cache);
  }

  changeLogo(e) {
  }

  swapLogo() {
    this.logo = window.location.protocol + '//' + window.location.host + '/assets/images/' + ((this.logo.indexOf('ecoaccueil') != -1) ? 'ecolocreche.png' : 'ecoaccueil.png');
  }

  addCustomHeader(label, value) {
    if (!label.value || !value.value) return;
    this.customisations.custom_headers.push({label: label.value, value: value.value});
    label.value = '';
    value.value = '';
  }

  removeCustomHeader(label) {
    let i = 0;
    this.customisations.custom_headers.forEach(info => {
      if (info.label == label) {
        this.customisations.custom_headers.splice(i, 1);
        return;
      }
    })
  }

  toggleTheme(e) {
    let parent = e.target.parentElement.parentElement.parentElement.parentElement;
    parent.classList.toggle('not-in-pdf');
  }

  getCommitment(id_theme) {
    return 'yolo';
  }

  setCommitment(id_theme, value) {
    console.log(id_theme, value);
  }

}
