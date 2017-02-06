import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'audit',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'liste/actifs',
        component: ActiveListComponent
      },
      {
        path: 'creer/:id_establishment',
        component: EditComponent
      },
      {
        path: ':id',
        component: EditComponent
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
