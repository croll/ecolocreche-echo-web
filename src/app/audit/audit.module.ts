import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { EditComponent } from './components/edit/edit.component';
import { AnswerComponent } from './components/answer/answer.component';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuditResolver } from './audit.resolver';
import { AnswerModule } from '../question/answer.module';
import { AuditOldPathRedirectComponent } from './audit.old-path-redirect.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    AnswerModule,
	  MaterialModule.forRoot(),
    FlexLayoutModule
  ],
  declarations: [
    ActiveListComponent,
    EditComponent,
    AnswerComponent,
    AuditOldPathRedirectComponent
  ],
  providers: [
    AuditResolver
  ]
})

export class AuditModule { }
