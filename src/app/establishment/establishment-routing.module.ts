import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { EstablishmentComponent } from './components/establishment/establishment.component'
import { EstablishmentListComponent } from './components/establishment-list/establishment-list.component'
import { AuthGuard } from '../auth-guard.service';

const establishmentRoutes: Routes = [
  {
    path: 'etablissement',
    canActivate: [AuthGuard],
    component: EstablishmentComponent,
    children: [
      {
        canActivateChild: [AuthGuard],
        path: 'liste',
        component: EstablishmentListComponent
      },
      {
        canActivateChild: [AuthGuard],
        path: ':id',
        component: EstablishmentListComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(establishmentRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EstablishmentRoutingModule{}
