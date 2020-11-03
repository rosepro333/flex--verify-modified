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

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'document',
        component: DocumentComponent
      },
      {
        path: 'document/details/:details',
        component: DocumentDetailsComponent
      },
      {
        path: 'verification-url',
        component: VerificationUrlComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'api-keys',
        component: ApiKeysComponent
      },
      {
        path: 'organization',
        component: OrganizationComponent
      },
      {
        path: 'create-user',
        component: CreateUserComponent
      },
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
