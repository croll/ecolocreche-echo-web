import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { PageNotFoundComponent }   from './not-found.component';
import { PageHomeComponent }   from './home.component';
import { AppRoutingModule } from './app-routing.module';
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
//import { AnswerModule } from './question/answer.module'; // a remetre, test
import { AuditModule } from './audit/audit.module';
import { NodeModule } from './node/node.module';
import { InquiryFormModule } from './inquiry-form/inquiry-form.module';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RestService } from './rest.service';

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
    //AnswerModule, a remetre, test
    NodeModule,
    InquiryFormModule,
    AuditModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // NgxDatatableModule,
    MaterialModule.forRoot(),
    FlexLayoutModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    RestService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
