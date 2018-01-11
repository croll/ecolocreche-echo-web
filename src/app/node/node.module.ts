import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from '../ext/ngx-color-picker';
import { NodeResolver } from './node.resolver'
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
    DetailComponent,
    EditComponent,
    ListComponent
  ],
  providers: [
    NodeResolver
  ]
})

export class NodeModule { }
