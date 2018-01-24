import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ListComponent } from './components/list/list.component';
import { EditThemeComponent } from './components/edit-theme/edit-theme.component';
import { EditComponent } from './components/edit/edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material';
import { MaterialModule } from '../material.module';
import { InquiryFormResolver } from '../common/resolvers/inquiry-form.resolver';
import { InquiryFormTreeResolver } from '../common/resolvers/inquiry-form-tree.resolver';

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
    EditThemeComponent,
    EditComponent,
  ],
  providers: [
    InquiryFormResolver,
    InquiryFormTreeResolver
  ]
})

export class InquiryFormRecapActionsModule {}
