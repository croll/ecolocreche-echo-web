import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EditThemeComponent } from './components/edit-theme/edit-theme.component';
import { EditComponent } from './components/edit/edit.component';
import { ManageComponent } from './components/manage/manage.component';
import { AuthGuard } from '../auth-guard.service';
import { InquiryFormResolver } from '../common/resolvers/inquiry-form.resolver';
import { RecapActionsThemesResolver } from './recap-actions-themes.resolver';
import { RecapActionsThemeResolver } from './recap-actions-theme.resolver';
import { InquiryFormThemesResolver } from '../common/resolvers/inquiry-form-themes.resolver';

const routes: Routes = [
  {
    path: 'questionnaire_recap_actions',
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
        path: ':id/themes',
        component: ManageComponent,
        resolve: {
          inquiryForm: InquiryFormResolver,
          recapActionsThemes: RecapActionsThemesResolver,
        }
      },
      {
        path: ':id/themes/creer',
        component: EditThemeComponent,
        resolve: {
          inquiryForm: InquiryFormResolver,
          inquiryFormThemes: InquiryFormThemesResolver,
        }
      },
      {
        path: ':id/themes/:id_theme/editer',
        component: EditThemeComponent,
        resolve: {
          inquiryForm: InquiryFormResolver,
          recapActionsTheme: RecapActionsThemeResolver,
          inquiryFormThemes: InquiryFormThemesResolver,
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
