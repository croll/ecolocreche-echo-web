import { Component, OnInit, OnDestroy, HostBinding, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquiryForm, InquiryFormExt } from '../../../common/models/inquiry-form';
import { Node } from '../../../common/models/node';
import { RestService } from '../../../rest.service';
import { PuppeteerPdfService } from '../../../puppeteerpdf.service';
import { AuditTools } from '../../../common/abstracts/audit-tools';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';
import { ExportCSVService } from '../../export-csv.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
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
  audit_report_header: any;

  auditTools = AuditTools.getInstance();

  @ViewChild( BaseChartDirective ) private _chart;

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestService, private wkService: PuppeteerPdfService, private csvService: ExportCSVService, private sanitizer: DomSanitizer, private datePipe: DatePipe) {
  }




  private audit_report_header_format() {
    // console.log("infos : ", this.infos);
    let audit_report_header = this.infos.inquiryform.audit_report_header;
    // console.log("audit_report_header : ", audit_report_header);
    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
     }

    let replaces = {
      establishment_name: escapeHtml(this.infos.audit.establishment.name),
      establishment_mail: escapeHtml(this.infos.audit.establishment.mail),
      audit_synthesis: escapeHtml(this.infos.audit.synthesis),
      audit_date_start: this.datePipe.transform(this.infos.audit.date_start, 'dd/MM/yyyy'),
      audit_date_end: this.infos.audit.date_end ? this.datePipe.transform(this.infos.audit.date_end, 'dd/MM/yyyy') : 'N/A',
      inquiryform_title: escapeHtml(this.infos.inquiryform.title),
      inquiryform_description: escapeHtml(this.infos.inquiryform.description),
      inquiryform_comment: escapeHtml(this.infos.inquiryform.comment),
    };
    for (let before in replaces) {
      let after=replaces[before];
      if (audit_report_header && before && after) {
        audit_report_header=audit_report_header.replace('{'+before+'}', after);
      }
    }
    this.audit_report_header = this.sanitizer.bypassSecurityTrustHtml(audit_report_header);
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.infos = data['infos']['audit1'];
      this.cache  = this.auditTools.cacheDatas(this.infos.nodes);
      this.questionList = this.cache.questionList;
      this.chartDatas = this.auditTools.generateChartDatas(this.chartType, this.cache.chartDatas);
      this.audit_report_header_format();
      this.node = this.infos.nodes;
    });
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

  exportCSV(format: string) {
    this.csvService.getContent(format, this.cache);
  }

}
