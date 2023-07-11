import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './navs/sidenav/sidenav.component';
import { TopnavComponent } from './navs/topnav/topnav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Error404Component } from './components/error-pages/error404/error404.component';
import { UserlistComponent } from './components/display/userlist/userlist.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { Error500Component } from './components/error-pages/error500/error500.component';
import { MainComponent } from './components/main/main.component';
import { DisplayRoutingModule } from './components/display/display-routing.module';
import { TaxlistComponent } from './components/display/taxlist/taxlist.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    TopnavComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    Error404Component,
    UserlistComponent,
    Error500Component,
    MainComponent,
    TaxlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DisplayRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTableExporterModule,
    NgxPaginationModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
