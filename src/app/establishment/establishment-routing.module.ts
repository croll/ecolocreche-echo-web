import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { EstablishmentListComponent } from './components/establishment-list/establishment-list.component';
import { EstablishmentDetailComponent } from './components/establishment-detail/establishment-detail.component';
import { EstablishmentEditComponent } from './components/establishment-edit/establishment-edit.component';
import { AuthGuard } from '../auth-guard.service';

const establishmentRoutes: Routes = [
  {
    path: 'etablissement',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'liste',
        component: EstablishmentListComponent
      },
      {
        path: 'creer',
        component: EstablishmentEditComponent
      },
      {
        path: ':id',
        component: EstablishmentDetailComponent,
        children: [
          {
              path: 'editer',
              component: EstablishmentEditComponent
          }
        ]
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
