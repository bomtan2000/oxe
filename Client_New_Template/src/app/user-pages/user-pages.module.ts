import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileService } from '../core/services/userprofile.service';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { NewPasswordComponent } from './new-password/new-password.component';
import { NotificationForgetPasswordComponent } from './notification-forget-password/notification-forget-password.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ForgetPasswordService } from '../core/services/forget-password.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notification-forget-password', component: NotificationForgetPasswordComponent },
  { path: 'new-password/:uuid', component: NewPasswordComponent },
  { path: 'notify-forget', component: NotificationForgetPasswordComponent },
  { path: 'request-verify', component: RequestPasswordComponent}
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, NewPasswordComponent, NotificationForgetPasswordComponent, RequestPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToasterModule,
  ],
  providers: [
    UserProfileService,
    ToasterService,
    ForgetPasswordService
  ]
})
export class UserPagesModule { }
