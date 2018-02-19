import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { EditComponent } from './components/edit/edit.component';
import { AnswerComponent } from './components/answer/answer.component';
import { AuthGuard } from '../auth-guard.service';
import { AuditResolver } from '../common/resolvers/audit.resolver';
import { AuditListResolver } from '../common/resolvers/audit-list.resolver';

const routes: Routes = [
  {
    path: 'recap_actions',
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'liste/actifs',
        component: ActiveListComponent,
        resolve: {
          infos: AuditListResolver
        }
      },
      {
        path: 'creer/:id_establishment',
        component: EditComponent
      },
      {
        path: ':id/editer',
        component: EditComponent,
        resolve: {
          infos: AuditResolver
        }
      },
      {
        path: ':key',
        component: AnswerComponent,
        resolve: {
          infos: AuditResolver
        }
      },
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
