import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DocumentComponent } from './document/document.component';
import { MatInputModule } from '@angular/material/input';
import { ChartsModule } from 'ng2-charts';
import { VerificationUrlComponent } from './verification-url/verification-url.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { from } from 'rxjs';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatSelectModule } from '@angular/material/select';
import { SettingsComponent } from './settings/settings.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';
import { OrganizationComponent } from './organization/organization.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DocumentService } from './document/services/document.service';
import { CreateApiKayComponent } from './dialog-box/create-api-kay/create-api-kay.component';
import { CreateSdyKeyComponent } from './dialog-box/create-sdy-key/create-sdy-key.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexUserComponent } from './flex-user/flex-user.component';
import { FlexTenentComponent } from './flex-tenent/flex-tenent.component';
import { CreateFlexTenentComponent } from './create-flex-tenent/create-flex-tenent.component';
import { CreateFlexUserComponent } from './create-flex-user/create-flex-user.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { DeleteTenentComponent } from './model/delete-tenent/delete-tenent.component';
import { DeleteUserComponent } from './model/delete-user/delete-user.component';
import { BlockUserComponent } from './model/block-user/block-user.component';
import { BlockTenentComponent } from './model/block-tenent/block-tenent.component';
import { MatMenuModule } from '@angular/material/menu';
import { ServicesService } from './service/services.service';
import { MainInterceptor } from './interceptor/main.interceptor';
import { ShortNamePipe } from './short-name.pipe';
import { ReportsComponent } from './reports/reports.component';
import { MobileActivityReportComponent } from './reports/mobile-activity-report/mobile-activity-report.component';
import { RolePipe } from './pipe/role.pipe';
import { UserAboutComponent } from './user-about/user-about.component';
import { PortalActivityReportComponent } from './reports/portal-activity-report/portal-activity-report.component';
import { ScanReportComponent } from './reports/scan-report/scan-report.component';
import { ReportService } from './service/report.service';
import { NotificationComponent } from './notification/notification.component';
import { EmailComponent } from './notification/email/email.component';
import { SmsComponent } from './notification/sms/sms.component';
import { NgxImgZoomModule  } from 'ngx-img-zoom';
import * as $ from 'jquery';
import { IdDetailsComponent } from './document-details/id-details/id-details.component';
import { RightSidenavComponent } from './right-sidenav/right-sidenav.component'
import { PrintDocumentComponent } from './document-details/print-document/print-document.component'
import { SidebarService } from './sidebar/sidebar.service';
import { AboutSidenavComponent } from './about-sidenav/about-sidenav.component';
import { RoleNamePipe } from './pipe/role-name.pipe';
import { DataCheckPipe } from './pipe/data-check.pipe';
import { LogoutComponent } from './sidebar/logout/logout.component';
import { NameFilterPipe } from './pipe/name-filter.pipe';
import { EmailReportComponent } from './reports/email-report/email-report.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    DocumentComponent,
    VerificationUrlComponent,
    DocumentDetailsComponent,
    SettingsComponent,
    ApiKeysComponent,
    OrganizationComponent,
    CreateUserComponent,
    CreateApiKayComponent,
    CreateSdyKeyComponent,
    FlexUserComponent,
    FlexTenentComponent,
    CreateFlexTenentComponent,
    CreateFlexUserComponent,
    ForgetPasswordComponent,
    SetPasswordComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    DeleteTenentComponent,
    DeleteUserComponent,
    BlockUserComponent,
    BlockTenentComponent,
    ShortNamePipe,
    ReportsComponent,
    MobileActivityReportComponent,
    RolePipe,
    UserAboutComponent,
    PortalActivityReportComponent,
    ScanReportComponent,
    NotificationComponent,
    EmailComponent,
    SmsComponent,
    IdDetailsComponent,
    RightSidenavComponent,
    PrintDocumentComponent,
    AboutSidenavComponent,
    RoleNamePipe,
    DataCheckPipe,
    LogoutComponent,
    NameFilterPipe,
    EmailReportComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ChartsModule,
    NgxQRCodeModule,
    ClipboardModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTabsModule,
    CarouselModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressBarModule,
    NgxImgZoomModule
  ],
  providers: [AuthService, AuthGuard, MatNativeDateModule, DocumentService, ServicesService,ReportService,SidebarService,
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
