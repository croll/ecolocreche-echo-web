import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { GenerateComponent } from './components/generate/generate.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuditResolver } from '../common/resolvers/audit.resolver';
import { AuditListResolver } from '../common/resolvers/audit-list.resolver';
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
    FlexLayoutModule,
    ChartsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    GenerateComponent,
  ],
  providers: [
    AuditResolver,
    AuditListResolver,
    ExportCSVService,
  ]
})

export class LabelingFileModule { }
