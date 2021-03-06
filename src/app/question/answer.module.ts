// imports angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

// import our software
import { AnswerEditComponent } from './components/answer-edit/answer-edit.component';
import { AnswerEditComponent as CheckboxAnswerEditComponent } from './components/q_checkbox/answer-edit/answer-edit.component';
import { AnswerEditComponent as RadioAnswerEditComponent } from './components/q_radio/answer-edit/answer-edit.component';
import { AnswerEditComponent as PercentsAnswerEditComponent } from './components/q_percents/answer-edit/answer-edit.component';
import { AnswerEditComponent as TextAnswerEditComponent } from './components/q_text/answer-edit/answer-edit.component';
import { AnswerEditComponent as NumericAnswerEditComponent } from './components/q_numeric/answer-edit/answer-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	  MaterialModule,
    FlexLayoutModule,
    ChartsModule
  ],
  declarations: [
    AnswerEditComponent,
    CheckboxAnswerEditComponent,
    RadioAnswerEditComponent,
    PercentsAnswerEditComponent,
    TextAnswerEditComponent,
    NumericAnswerEditComponent,
  ],
  providers: [
  ],
  exports: [
    AnswerEditComponent,
  ]
})

export class AnswerModule { }
