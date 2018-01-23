import { Component, OnInit, OnDestroy, HostBinding, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../../common/models/inquiry-form';
import { Node } from '../../../common/models/node';
import { RestService } from '../../../rest.service';
import { PuppeteerPdfService } from '../../../puppeteerpdf.service';
import { AuditTools } from '../../components/abstracts/audit-tools';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';
import { ExportCSVService } from '../../export-csv.service';
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
  chartDatas: any;
  cache: any;
  chartType: string = 'pie';
  hideChart: boolean = false;

  auditTools = AuditTools.getInstance();

  @ViewChild( BaseChartDirective ) private _chart;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, private wkService: PuppeteerPdfService, private csvService: ExportCSVService) {
    this.infos = this.route.snapshot.data['infos'];
    this.cache  = this.auditTools.cacheDatas(this.infos.nodes);
    this.questionList = this.cache.questionList;
    this.chartDatas = this.auditTools.generateChartDatas(this.chartType, this.cache.chartDatas);
  }

  ngOnInit() {
    this.node = this.infos.nodes;
  }

  setChartType(chartType, id_theme) {
    this.chartType = chartType.value;
    Object.assign(this.chartDatas[id_theme], this.auditTools.toChartDatas(this.chartType, this.cache.chartDatas, id_theme));
    setTimeout(() => {
      this._chart.ngOnChanges({});
    }, 150);
  }

  toggleChartType(chartType, id_theme) {
    this.hideChart = true;
    chartType = (chartType == 'bar') ? 'pie' : 'bar';
    Object.assign(this.chartDatas[id_theme], this.auditTools.toChartDatas(chartType, this.cache.chartDatas, id_theme));
    setTimeout(() => {
      this.hideChart = false;
      this._chart.ngOnChanges({});
      // this._chart.refresh();
    }, 0);
  }

  pdf() {
    this.wkService.print("audit", this.infos.audit.id);
  }

  exportCSV() {
    this.csvService.getContent(this.cache);
  }

}
