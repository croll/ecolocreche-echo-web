import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { EditComponent } from './components/edit/edit.component';
import { AnswerComponent } from './components/answer/answer.component';
import { AuthGuard } from '../auth-guard.service';
import { InquiryFormResolver } from '../inquiry-form/inquiry-form.resolver';

const routes: Routes = [
  {
    path: 'audit',
    canActivate: [AuthGuard],
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
        path: 'edit/:id',
        component: EditComponent
      },
      {
        path: ':key',
        resolve: {
          inquiryFormTree: InquiryFormResolver
        },
        component: AnswerComponent
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
