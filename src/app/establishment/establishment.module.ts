import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EstablishmentRoutingModule } from './establishment-routing.module';
import { EstablishmentListComponent } from './components/establishment-list/establishment-list.component';
import { EstablishmentService } from './services/establishment.service';
import { EstablishmentDetailComponent } from './components/establishment-detail/establishment-detail.component';
import { EstablishmentEditComponent } from './components/establishment-edit/establishment-edit.component';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    EstablishmentRoutingModule,
    ReactiveFormsModule,
	  MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  declarations: [
    EstablishmentListComponent,
    EstablishmentDetailComponent,
    EstablishmentEditComponent
  ],
  providers: [
    EstablishmentService
  ]
})

export class EstablishmentModule { }
