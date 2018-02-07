import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { EditComponent } from './components/edit/edit.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ReportComponent } from './components/report/report.component';
import { CompareComponent } from './components/compare/compare.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuditResolver, AuditResolverPreviousAudits } from '../common/resolvers/audit.resolver';
import { AuditListResolver } from '../common/resolvers/audit-list.resolver';
import { AnswerModule } from '../question/answer.module';
import { AuditOldPathRedirectComponent } from './audit.old-path-redirect.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ExportCSVService } from './export-csv.service';
import { MatIconRegistry } from '@angular/material';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    AnswerModule,
    FlexLayoutModule,
    ChartsModule,
    FormsModule,
    MaterialModule,
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
    AuditResolverPreviousAudits,
    AuditListResolver,
    ExportCSVService
  ]
})

export class AuditModule { }
