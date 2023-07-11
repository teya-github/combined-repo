import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Error404Component } from './components/error-pages/error404/error404.component';
import { UserlistComponent } from './components/display/userlist/userlist.component';
import { Error500Component } from './components/error-pages/error500/error500.component';
import { MainComponent } from './components/main/main.component';
import { TaxlistComponent } from './components/display/taxlist/taxlist.component';


const routes: Routes = [
  { path: "", component: DashboardComponent},
  { path: "Home", component: DashboardComponent }, 
  { path: "Login", component: LoginComponent }, 
  { path: "Register", component: RegisterComponent }, 
  { path: "404", component: Error404Component }, 
  { path: "500", component: Error500Component }, 
  { path: "UserList", component: UserlistComponent }, 
  { path: "TaxList", component: TaxlistComponent }, 
  { path: "Main", component: MainComponent }, 
  {path: '**', redirectTo: ''}//not found page must be last in the list
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
