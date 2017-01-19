import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { PageNotFoundComponent }   from './not-found.component';
import { PageHomeComponent }   from './home.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import 'hammerjs';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/components/login/login.component';
import { LostPasswordComponent } from './user/components/lost-password/lost-password.component';
import { ListComponent } from './user/components/list/list.component';
import { EtablissementComponent } from './etablissement/etablissement.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    LostPasswordComponent,
    LoginComponent,
    ListComponent,
    EtablissementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	  HttpModule,
    AppRoutingModule,
    NgxChartsModule,
    NgxDatatableModule,
	  MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
