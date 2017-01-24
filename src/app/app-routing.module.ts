import { NgModule }              from '@angular/core';
import { PageHomeComponent } from './home.component';
import { PageNotFoundComponent } from './not-found.component';
import { LoginComponent as UserLoginComponent} from './user/components/login/login.component';
import { LogoutComponent as UserLogoutComponent} from './user/components/logout/logout.component';
import { LostPasswordComponent as UserLostPasswordComponent} from './user/components/lost-password/lost-password.component';
import { ListComponent as UserListComponent} from './user/components/list/list.component';
import { RouterModule, Routes }  from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'connexion', component: UserLoginComponent },
  { path: 'deconnexion', component: UserLogoutComponent },
  { path: 'motdepasse', component: UserLostPasswordComponent },
  { path: 'utilisateur/liste', component: UserListComponent },
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
