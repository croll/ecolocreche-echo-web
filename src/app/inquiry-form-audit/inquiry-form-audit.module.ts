import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InquiryFormResolver } from '../common/resolvers/inquiry-form.resolver';
import { InquiryFormTreeResolver } from './inquiry-form-tree.resolver';
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
    MaterialModule,
    QuillModule
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    EditComponent,
  ],
  providers: [
    InquiryFormResolver,
    InquiryFormTreeResolver,
    {
      provide: QUILL_CONFIG,
      useValue: DEFAULT_QUILL_CONFIG
    },
  ]
})

export class InquiryFormAuditModule {}
