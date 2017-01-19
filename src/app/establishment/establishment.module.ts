import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstablishmentRoutingModule } from './establishment-routing.module';
import { EstablishmentComponent } from './components/establishment/establishment.component';
import { EstablishmentListComponent } from './components/establishment-list/establishment-list.component';

@NgModule({
  imports: [
    CommonModule,
    EstablishmentRoutingModule,
  ],
  declarations: [
    EstablishmentComponent,
    EstablishmentListComponent
  ]
})

export class EstablishmentModule { }
