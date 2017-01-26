import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { DirectoryEditComponent } from './components/directory-edit/directory-edit.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'questionnaire',
    canActivate: [AuthGuard],
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
      },
      {
        path: ':id/editer',
        component: EditComponent
      }
    ]
  }, {
    path: 'theme',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'creer',
        component: DirectoryEditComponent
      },
      {
        path: ':id/editer',
        component: DirectoryEditComponent
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
