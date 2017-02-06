import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from '../auth-guard.service';
import { InquiryFormResolver } from './inquiry-form.resolver';

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
        resolve: {
          inquiryFormTree: InquiryFormResolver
        },
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
