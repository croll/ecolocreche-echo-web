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

import 'hammerjs';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { LostPasswordComponent } from './components/user/lost-password/lost-password.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    LostPasswordComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	  HttpModule,
    AppRoutingModule,
    NgxChartsModule,
	  MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
