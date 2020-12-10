import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentComponent } from './document/document.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { AuthGuard } from './auth/auth.guard';
import { VerificationUrlComponent } from './verification-url/verification-url.component';
import { SettingsComponent } from './settings/settings.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';
import { OrganizationComponent } from './organization/organization.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FlexUserComponent } from './flex-user/flex-user.component';
import { FlexTenentComponent } from './flex-tenent/flex-tenent.component';
import { CreateFlexUserComponent } from './create-flex-user/create-flex-user.component';
import { CreateFlexTenentComponent } from './create-flex-tenent/create-flex-tenent.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'documents',
        component: DocumentComponent,
      },
      {
        path: 'documents/:id',
        component: DocumentDetailsComponent,
      },
      {
        path: 'verification-url',
        component: VerificationUrlComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'api-keys',
        component: ApiKeysComponent,
      },
      {
        path: 'organization',
        component: OrganizationComponent,
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
      },
      {
        path: 'flexm-user',
        component: FlexUserComponent,
      },
      {
        path: 'flexm-tenent',
        component: FlexTenentComponent,
      },
      {
        path: 'create-flexm-user',
        component: CreateFlexUserComponent,
      },
      {
        path: 'cretae-flexm-tenent',
        component: CreateFlexTenentComponent,
      },
    ],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'forget-passowrd',
    component: ForgetPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'set-forget-password/:forgetPasswordId',
    component: SetPasswordComponent,
  },
  {
    path: 'resetPassword/:resetUser',
    component: NewPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
