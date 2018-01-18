import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from '../auth-guard.service';
import { RecapActionsResolver } from './recap-actions.resolver';
import { RecapActionsTreeResolver } from './recap-actions-tree.resolver';

const routes: Routes = [
  {
    path: 'recap-actions',
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
          inquiryFormTree: RecapActionsTreeResolver,
          inquiryForm: RecapActionsResolver
        }
      },
      {
        path: ':id/editer',
        component: EditComponent,
        resolve: {
          inquiryForm: RecapActionsResolver
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
