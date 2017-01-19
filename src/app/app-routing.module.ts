import { NgModule }              from '@angular/core';
import { PageHomeComponent } from './home.component';
import { PageNotFoundComponent } from './not-found.component';
import { LoginComponent } from './user/components/login/login.component';
import { LostPasswordComponent } from './user/components/lost-password/lost-password.component';
import { ListComponent } from './user/components/list/list.component';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'motdepasse', component: LostPasswordComponent },
  { path: 'utilisateur/liste', component: ListComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{}
