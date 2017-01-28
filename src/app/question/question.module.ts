import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { EditComponent as EditComponent_q_checkbox } from './components/q_checkbox/edit/edit.component';
import { DetailComponent as DetailComponent_q_checkbox } from './components/q_checkbox/detail/detail.component';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
	  MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  declarations: [
    DetailComponent,
    EditComponent,
    EditComponent_q_checkbox,
    DetailComponent_q_checkbox,
  ],
  providers: [
  ]
})

export class QuestionModule { }
