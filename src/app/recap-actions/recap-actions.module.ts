import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { EditComponent } from './components/edit/edit.component';
import { AnswerComponent } from './components/answer/answer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuditResolver } from '../common/resolvers/audit.resolver';
import { AuditListResolver } from '../common/resolvers/audit-list.resolver';
import { AnswerModule } from '../question/answer.module';
import { FormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { MaterialModule } from '../material.module';
import { QuillModule, QuillConfigInterface, QUILL_CONFIG } from 'ngx-quill-wrapper';
const DEFAULT_QUILL_CONFIG: QuillConfigInterface = {};

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    AnswerModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    QuillModule
  ],
  declarations: [
    ActiveListComponent,
    EditComponent,
    AnswerComponent
  ],
  providers: [
    AuditResolver,
    AuditListResolver,
    {
      provide: QUILL_CONFIG,
      useValue: DEFAULT_QUILL_CONFIG
    }
  ]
})

export class RecapActionsModule { }
