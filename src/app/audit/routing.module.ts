import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { EditComponent } from './components/edit/edit.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ReportComponent } from './components/report/report.component';
import { CompareComponent } from './components/compare/compare.component';
import { AuthGuard } from '../auth-guard.service';
import { AuditResolver, AuditResolverPreviousAudits } from '../common/resolvers/audit.resolver';
import { AuditListResolver } from '../common/resolvers/audit-list.resolver';
import { AuditOldPathRedirectComponent } from './audit.old-path-redirect.component';

const routes: Routes = [
  {
    path: 'audit',
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
        component: EditComponent,
        resolve: {
          old_audits: AuditResolverPreviousAudits,
        }
      },
      {
        path: ':id/editer',
        component: EditComponent,
        resolve: {
          infos: AuditResolver,
        }
      },
      {
        path: 'accueil/:unknown/:key',
        component: AuditOldPathRedirectComponent
      },
      {
        path: ':key',
        component: AnswerComponent,
        resolve: {
          infos: AuditResolver
        }
      },
      {
        path: ':id/rapport',
        component: ReportComponent,
        resolve: {
          infos: AuditResolver
        },
      },
      {
        path: 'comparer/:id/:id2/:id3',
        resolve: {
          infos: AuditResolver,
        },
        component: CompareComponent
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
