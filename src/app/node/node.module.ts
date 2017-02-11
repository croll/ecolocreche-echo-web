import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule, MdIconRegistry } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
	  MaterialModule.forRoot()
  ],
  declarations: [
    DetailComponent,
    EditComponent,
    ListComponent
  ],
  providers: []
})

export class NodeModule { }
