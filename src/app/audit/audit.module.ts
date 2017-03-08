import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { EditComponent } from './components/edit/edit.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ReportComponent } from './components/report/report.component';
import { CompareComponent } from './components/compare/compare.component';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuditResolver } from './audit.resolver';
import { AuditListResolver } from './audit-list.resolver';
import { AnswerModule } from '../question/answer.module';
import { AuditOldPathRedirectComponent } from './audit.old-path-redirect.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ExportCSVService } from './export-csv.service';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    AnswerModule,
	  MaterialModule,
    FlexLayoutModule,
    ChartsModule,
    FormsModule
  ],
  declarations: [
    ActiveListComponent,
    EditComponent,
    AnswerComponent,
    ReportComponent,
    CompareComponent,
    AuditOldPathRedirectComponent,
  ],
  providers: [
    AuditResolver,
    AuditListResolver,
    ExportCSVService
  ]
})

export class AuditModule { }
