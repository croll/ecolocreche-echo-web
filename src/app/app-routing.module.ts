import { NgModule }              from '@angular/core';
import { PageHomeComponent } from './home.component';
import { PageNotFoundComponent } from './not-found.component';
import { LoginComponent } from './components/user/login/login.component';
import { LostPasswordComponent } from './components/user/lost-password/lost-password.component';
import { RouterModule, Routes }  from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'motdepasse', component: LostPasswordComponent },
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
