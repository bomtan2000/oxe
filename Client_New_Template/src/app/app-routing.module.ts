import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/helper';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './user-pages/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'administrator', pathMatch: 'full' },
  // { path: 'dashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , canLoad: [AuthGuardService]},
  { path: 'administrator', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , canLoad: [AuthGuardService]},
  { path: 'page', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  // { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
