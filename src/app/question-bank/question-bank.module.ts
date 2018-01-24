import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ManageComponent } from './components/manage/manage.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from '../ext/ngx-color-picker';
import { QuestionBankResolver } from './question-bank.resolver'
import { MatIconRegistry } from '@angular/material';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ColorPickerModule,
    MaterialModule
  ],
  declarations: [
    ManageComponent,
    EditComponent,
    ListComponent
  ],
  providers: [
    QuestionBankResolver
  ]
})

export class QuestionBankModule { }
