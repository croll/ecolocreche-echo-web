import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EditThemeComponent } from './components/edit-theme/edit-theme.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from '../auth-guard.service';
import { InquiryFormResolver } from '../common/resolvers/inquiry-form.resolver';
import { InquiryFormTreeResolver } from '../common/resolvers/inquiry-form-tree.resolver';

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
        path: ':id/editer',
        component: EditComponent,
        resolve: {
          inquiryForm: InquiryFormResolver
        }
      },
      {
        path: ':id/edit-theme',
        component: EditThemeComponent,
        resolve: {
          inquiryForm: InquiryFormTreeResolver,
          inquiryTreeForm: InquiryFormTreeResolver
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
