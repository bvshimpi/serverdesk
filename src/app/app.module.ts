import { BrowserModule, } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './public/login/login.component';
import { HomeComponent } from './public/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material.module';
import { RegsiterComponent } from './public/regsiter/regsiter.component';
import { ForgotpasswordComponent } from './public/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { TicketsComponent } from './layout/myticket/tickets/tickets.component';
import { AddupdateticketComponent } from './layout/myticket/addupdateticket/addupdateticket.component';
import { RticketsComponent } from './layout/resolveticket/rtickets/rtickets.component';
import { DxDataGridModule,DxDropDownBoxModule,DxTreeViewModule } from 'devextreme-angular';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ApplicationGuard } from './application.guard';
import { ActivateUserComponent } from './public/activate-user/activate-user.component';
import { DxPieChartModule } from 'devextreme-angular';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UnitTestComponent } from './unit-test/unit-test.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    LoginComponent,
    HomeComponent,
    RegsiterComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    TicketsComponent,
    AddupdateticketComponent,
    RticketsComponent,
    ActivateUserComponent,
    UnitTestComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxTreeViewModule,
    ToastrModule.forRoot(),
    HttpModule,
    NgxSpinnerModule,
    DxPieChartModule,
    ReactiveFormsModule
  ],
  providers: [ApplicationGuard,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
