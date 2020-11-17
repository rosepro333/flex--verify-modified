import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { AuthService } from "./auth/auth.service";
import { HomeLayoutComponent } from "./layouts/home-layout.component";
import { LoginLayoutComponent } from "./layouts/login-layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { DocumentComponent } from "./document/document.component";
import { MatInputModule } from "@angular/material/input";
import { ChartsModule } from "ng2-charts";
import { VerificationUrlComponent } from "./verification-url/verification-url.component";
import { NgxQRCodeModule } from "@techiediaries/ngx-qrcode";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxMaskModule } from "ngx-mask";
import { MatTableModule } from "@angular/material/table";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { from } from "rxjs";
import { DocumentDetailsComponent } from "./document-details/document-details.component";
import { CarouselModule } from "ngx-owl-carousel-o";
import { MatSelectModule } from "@angular/material/select";
import { SettingsComponent } from "./settings/settings.component";
import { ApiKeysComponent } from "./api-keys/api-keys.component";
import { OrganizationComponent } from "./organization/organization.component";
import { CreateUserComponent } from "./create-user/create-user.component";
import { DocumentService } from "./document/services/document.service";
import { CreateApiKayComponent } from "./dialog-box/create-api-kay/create-api-kay.component";
import { CreateSdyKeyComponent } from "./dialog-box/create-sdy-key/create-sdy-key.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
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
  ],
  imports: [
    BrowserModule,
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
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTabsModule,
    CarouselModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [AuthService, AuthGuard, MatNativeDateModule, DocumentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
