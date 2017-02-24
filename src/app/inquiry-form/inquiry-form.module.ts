import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InquiryFormResolver } from './inquiry-form.resolver';
import { InquiryFormTreeResolver } from './inquiry-form-tree.resolver';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
	  MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    EditComponent,
  ],
  providers: [
    InquiryFormResolver,
    InquiryFormTreeResolver
  ]
})

export class InquiryFormModule {}
