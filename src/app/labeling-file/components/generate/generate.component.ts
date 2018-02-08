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
import { AuthService } from '../../../auth.service';

import * as moment from 'moment';

@Component({
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {

  private id_inquiryform: number;
  current: LabelingFile;
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
  editorConfig: QuillConfigInterface = {
    theme: 'bubble',
    placeholder: 'Votre commentaire...'
  };
  customisations: LabelingFile.Json = new LabelingFile.Json();

  // Buffer objets to be watched, to avoid calling functions on each tick

  auditTools = AuditTools.getInstance();

  @ViewChild( BaseChartDirective ) private _chart;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, private csvService: ExportCSVService, private puppeeterService: PuppeteerPdfService, public authService: AuthService) {

    this.current = this.route.snapshot.data['labeling_file'];

    if (this.current.datajson) {
      this.customisations = Object.assign(this.customisations, JSON.parse(this.current.datajson));
    }

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

    for (let id_theme in this.audit1Cache.chartDatas.themes) {
      let family = (this.audit1Cache.chartDatas.themes[id_theme].family == 'environnementales') ? 'environment' : 'social';
      this.charts[family].themes.push({id_theme: parseInt(id_theme), title: this.audit1Cache.chartDatas.themes[id_theme].title, chart: this.auditTools.toChartDatas('bar', chartDatasThemes, id_theme)});
    }

  }

  ngOnInit() {
  }

  pdf() {
    this.puppeeterService.print('compare', this.route.params['id']);
  }

  exportCSV(format: string) {
    this.csvService.getContent(format, this.audit1Cache, this.audit2Cache);
  }

  save() {
    this.restService.save(Object.assign(this.current, {datajson: JSON.stringify(this.customisations)}), 'datalabelingfiles').subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.error(err);
    });
    return false;
  }

}
