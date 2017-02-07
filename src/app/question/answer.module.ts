// imports angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// import our software
import { EditComponent as AnswerEditComponent} from './components/answer-edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	  MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  declarations: [
    AnswerEditComponent,
  ],
  providers: [
  ]
})

export class AnswerModule { }
