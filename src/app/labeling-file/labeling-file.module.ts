import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { GenerateComponent } from './components/generate/generate.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuditResolver } from '../common/resolvers/audit.resolver';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ExportCSVService } from './export-csv.service';
import { MatIconRegistry } from '@angular/material';
import { MaterialModule } from '../material.module';
import { QuillModule, QuillConfigInterface, QUILL_CONFIG } from 'ngx-quill-wrapper';
const DEFAULT_QUILL_CONFIG: QuillConfigInterface = {};

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChartsModule,
    FormsModule,
    MaterialModule,
    QuillModule
  ],
  declarations: [
    GenerateComponent,
  ],
  providers: [
    AuditResolver,
    ExportCSVService,
    {
      provide: QUILL_CONFIG,
      useValue: DEFAULT_QUILL_CONFIG
    }
  ]
})

export class LabelingFileModule { }
