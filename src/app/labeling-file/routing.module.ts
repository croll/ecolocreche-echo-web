import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { GenerateComponent } from './components/generate/generate.component';
import { AuthGuard } from '../auth-guard.service';
import { AuditResolver } from '../common/resolvers/audit.resolver';
import { LabelingFileResolver } from './labeling-file.resolver';
import { RestService } from '../rest.service';
import { Observable } from 'rxjs';

const routes: Routes = [
  {
    path: 'dossier_de_labelisation',
    //canActivate: [AuthGuard],
    children: [
      {
        path: ':id_labeling_file',
        resolve: {
          audits: AuditResolver,
          labeling_files: LabelingFileResolver
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
