import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'questionnaire/:id_theme/:id_rubrique/',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'creer',
        component: EditComponent
      },
      {
        path: ':id',
        component: DetailComponent,
      },
      {
        path: ':id/editer',
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
