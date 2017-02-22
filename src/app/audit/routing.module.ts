import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { EditComponent } from './components/edit/edit.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ReportComponent } from './components/report/report.component';
import { AuthGuard } from '../auth-guard.service';
import { AuditResolver } from './audit.resolver';
import { AuditOldPathRedirectComponent } from './audit.old-path-redirect.component';

const routes: Routes = [
  {
    path: 'audit',
    //canActivate: [AuthGuard],
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
        path: ':id/editer',
        component: EditComponent
      },
      {
        path: 'accueil/:unknown/:key',
        component: AuditOldPathRedirectComponent
      },
      {
        path: ':key',
        resolve: {
          infos: AuditResolver
        },
        component: AnswerComponent
      },
      {
        path: ':id/rapport',
        component: ReportComponent,
        resolve: {
          infos: AuditResolver
        },
      },
      {
        path: 'comparer/:id1/:id2',
        component: ReportComponent
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
