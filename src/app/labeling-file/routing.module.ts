import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { GenerateComponent } from './components/generate/generate.component';
import { AuthGuard } from '../auth-guard.service';
import { AuditResolver } from '../common/resolvers/audit.resolver';

const routes: Routes = [
  {
    path: 'labelisation',
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'comparer/:id/:id2/:id3',
        resolve: {
          infos: AuditResolver,
        },
        component: GenerateComponent
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
