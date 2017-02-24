import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from '../auth-guard.service';
import { EstablishmentResolver } from './establishment.resolver';

const routes: Routes = [
  {
    path: 'etablissement',
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'liste',
        component: ListComponent
      },
      {
        path: 'creer',
        component: EditComponent
      },
      {
        path: ':id',
        component: DetailComponent,
        resolve: {
          infos: EstablishmentResolver
        }
      },
      {
        path: ':id/editer',
        component: EditComponent,
        resolve: {
          infos: EstablishmentResolver
        }
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule{}
