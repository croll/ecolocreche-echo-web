import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecapActionsResolver } from './recap-actions.resolver';
import { RecapActionsTreeResolver } from './recap-actions-tree.resolver';
import { MatIconRegistry } from '@angular/material';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    EditComponent,
  ],
  providers: [
    RecapActionsResolver,
    RecapActionsTreeResolver
  ]
})

export class RecapActionsModule {}
