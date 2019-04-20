import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
	{
		 path: '/dashboard',component: DashboardComponent, canActivate: [AuthGuard]
	},
	{		
         path: '', redirectTo: '/login', pathMatch: 'full', component: LoginComponent
		
	},	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
