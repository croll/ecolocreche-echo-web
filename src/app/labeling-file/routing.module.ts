import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { GenerateComponent } from './components/generate/generate.component';
import { AuthGuard } from '../auth-guard.service';
import { LabelingFileResolver } from './labeling-file.resolver';

const routes: Routes = [
  {
    path: 'dossier_de_labelisation',
    //canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        resolve: {
          infos: LabelingFileResolver,
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
