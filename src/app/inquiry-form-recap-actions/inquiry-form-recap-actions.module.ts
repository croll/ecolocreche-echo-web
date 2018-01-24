import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { MatIconRegistry } from '@angular/material';
import { ListComponent } from './components/list/list.component';
import { EditThemeComponent } from './components/edit-theme/edit-theme.component';
import { EditComponent } from './components/edit/edit.component';
import { ManageComponent } from './components/manage/manage.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { InquiryFormResolver } from '../common/resolvers/inquiry-form.resolver';
import { InquiryFormThemesResolver } from '../common/resolvers/inquiry-form-themes.resolver';
import { RecapActionsThemeResolver } from './recap-actions-theme.resolver';

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
    EditComponent,
    EditThemeComponent,
    ManageComponent
  ],
  providers: [
    InquiryFormResolver,
    InquiryFormThemesResolver,
    RecapActionsThemeResolver
  ]
})

export class InquiryFormRecapActionsModule {}
