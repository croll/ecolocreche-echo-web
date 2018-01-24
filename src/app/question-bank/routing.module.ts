import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ManageComponent } from './components/manage/manage.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from '../auth-guard.service';
import { QuestionBankResolver } from './question-bank.resolver';

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
        component: ManageComponent,
        resolve: {
          infos: QuestionBankResolver
        }
      },
      {
        path: ':id_theme/editer',
        component: EditComponent,
        resolve: {
          infos: QuestionBankResolver
        }
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
        component: ManageComponent,
        resolve: {
          infos: QuestionBankResolver
        }
      },
      {
        path: ':id_theme/rubrique/:id_category/editer',
        component: EditComponent,
        resolve: {
          infos: QuestionBankResolver
        }
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
