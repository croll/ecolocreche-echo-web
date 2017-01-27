import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'question',
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'creer/:id_node_parent',
        component: EditComponent
      },
      {
        path: ':id_node',
        component: DetailComponent,
      },
      {
        path: ':id_node/editer',
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
