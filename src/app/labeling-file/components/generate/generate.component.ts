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
import { QuillConfigInterface } from 'ngx-quill-wrapper';

import * as moment from 'moment';

@Component({
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {

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

    // this.customisations.custom_headers.push(new LabelingFile.CustomHeader('toto', 'yo yo'));

    // console.log(this.route.snapshot.data['audits']);
    // console.log(this.route.snapshot.data['labeling_files']);

    let tmp1 = this.route.snapshot.data['audits']['audit1'];

    if (this.route.snapshot.data['audits']['audit2']) {
      let tmp2 = this.route.snapshot.data['audits']['audit2'];
      if (new Date(tmp1.audit.date_start) < new Date(tmp2.audit.date_start)) {
        this.audit1 = tmp1;
        this.audit2 = tmp2;
      } else {
        this.audit1 = tmp2;
        this.audit2 = tmp1;
      }
    } else {
      this.audit1 = tmp1;
    }

    this.audit1Cache  = this.auditTools.cacheDatas(this.audit1.nodes);
    let chartDatasThemes = [this.audit1Cache.chartDatas.themes];
    let chartDatasFamilies = [this.audit1Cache.chartDatas.families];

    if (this.audit2) {
      this.audit2Cache  = this.auditTools.cacheDatas(this.audit2.nodes);
      this.themeList = this.auditTools.merge(this.audit1Cache.chartDatas.themes, this.audit2Cache.chartDatas.themes);
      chartDatasThemes.push(this.audit2Cache.chartDatas.themes);
      chartDatasFamilies.push(this.audit2Cache.chartDatas.families);
    } else {
      console.log(this.audit1Cache.chartDatas.themes);
      this.themeList = [];
      for (let id_node in this.audit1Cache.chartDatas.themes) {
        this.themeList.push(this.audit1Cache.chartDatas.themes[id_node]);
      }
    }

    this.charts.environment = {
      audit1: this.auditTools.toChartDatas('pie', this.audit1Cache.chartDatas.families, 'environnementales'),
      global: this.auditTools.toChartDatas('bar', chartDatasFamilies, 'environnementales'),
      radar: this.auditTools.toChartDatas('radar', chartDatasThemes, 'environnementales'),
      themes: []
    };

    this.charts.social = {
      audit1: this.auditTools.toChartDatas('pie', this.audit1Cache.chartDatas.families, 'sociales'),
      global: this.auditTools.toChartDatas('bar', chartDatasFamilies, 'sociales'),
      radar: this.auditTools.toChartDatas('radar', chartDatasThemes, 'sociales'),
      themes: []
    };

    if (this.audit2) {
      Object.assign(this.charts.environment, {
        audit2: this.auditTools.toChartDatas('pie', this.audit2Cache.chartDatas.families, 'environnementales'),
      });
      Object.assign(this.charts.social, {
        audit2: this.auditTools.toChartDatas('pie', this.audit2Cache.chartDatas.families, 'sociales'),
      });
    }

    for (let theme_id in this.audit1Cache.chartDatas.themes) {
      let family = (this.audit1Cache.chartDatas.themes[theme_id].family == 'environnementales') ? 'environment' : 'social';
      this.charts[family].themes.push({title: this.audit1Cache.chartDatas.themes[theme_id].title, chart: this.auditTools.toChartDatas('bar', chartDatasThemes, theme_id)});
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
    return '';
  }

  setCommitment(id_theme, value) {
    console.log(id_theme, value);
  }

}
