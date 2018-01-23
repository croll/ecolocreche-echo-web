import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent }   from './not-found.component';
import { PageHomeComponent }   from './home.component';
import { AppRoutingModule } from './app-routing.module';
import { MatIconRegistry } from '@angular/material';
import { MaterialModule } from './material.module';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import 'hammerjs';
import { AppComponent } from './app.component';
import { LoginComponent as UserLoginComponent} from './user/components/login/login.component';
import { LogoutComponent as UserLogoutComponent} from './user/components/logout/logout.component';
import { LostPasswordComponent as UserLostPasswordComponent} from './user/components/lost-password/lost-password.component';
import { ListComponent as UserListComponent} from './user/components/list/list.component';
import { EditComponent as UserEditComponent} from './user/components/edit/edit.component';
import { DetailComponent as UserDetailComponent} from './user/components/detail/detail.component';
import { EstablishmentModule } from './establishment/establishment.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './question/answer.module'; // a remetre, test
import { AuditModule } from './audit/audit.module';
import { InquiryFormAuditModule } from './inquiry-form-audit/inquiry-form-audit.module';
import { InquiryFormAuditNodeModule } from './inquiry-form-audit-node/inquiry-form-audit-node.module';
import { InquiryFormRecapActionsModule } from './inquiry-form-recap-actions/inquiry-form-recap-actions.module';
import { InquiryFormRecapActionsNodeModule } from './inquiry-form-recap-actions-node/inquiry-form-recap-actions-node.module';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RestService } from './rest.service';
import { WkHtmlToPdfService } from './wkhtmltopdf.service';
import { PuppeteerPdfService } from './puppeteerpdf.service';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    UserLoginComponent,
    UserLostPasswordComponent,
    UserLogoutComponent,
    UserListComponent,
    UserEditComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	  HttpModule,
    EstablishmentModule,
    QuestionModule,
    AnswerModule,
    InquiryFormAuditNodeModule,
    InquiryFormAuditModule,
    InquiryFormRecapActionsModule,
    InquiryFormRecapActionsNodeModule,
    AuditModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // NgxDatatableModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    RestService,
    //WkHtmlToPdfService
    PuppeteerPdfService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
