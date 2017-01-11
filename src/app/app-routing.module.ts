import { NgModule }              from '@angular/core';
import { PageHomeComponent } from './home.component';
import { PageNotFoundComponent } from './not-found.component';
import { RouterModule, Routes }  from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: PageHomeComponent },
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
