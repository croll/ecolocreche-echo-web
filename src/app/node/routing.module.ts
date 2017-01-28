import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'theme',
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
        path: ':id_theme',
        component: DetailComponent
      },
      {
        path: ':id_theme/editer',
        component: EditComponent
      },
      {
        path: ':id_theme/rubrique/liste',
        component: ListComponent
      },
      {
        path: ':id_theme/rubrique/creer',
        component: EditComponent
      },
      {
        path: ':id_theme/rubrique/:id_category',
        component: DetailComponent,
      },
      {
        path: ':id_theme/rubrique/:id_category/editer',
        component: EditComponent
      }
    ]
  },
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
