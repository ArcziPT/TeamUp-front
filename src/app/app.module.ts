import { EditProjectInfoDialogComponent } from './dialogs/project/edit-project-info-dialog/edit-project-info-dialog.component';
import { EditUserInfoDialogComponent } from './dialogs/user/edit-user-info-dialog/edit-user-info-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProjectSiteComponent } from './project-site/project-site.component';
import { SearchComponent } from './search/search.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CreateJobPostingDialogComponent } from './dialogs/project/create-job-posting-dialog/create-job-posting-dialog.component';
import { DepartmentInputComponent } from './dialogs/helpers/department-input/department-input.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import { CreateInvitationDialogComponent } from './dialogs/user/create-invitation-dialog/create-invitation-dialog.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ProjectSelectionComponent } from './dialogs/helpers/project-selection/project-selection.component';
import { AddDepartmentDialogComponent } from './dialogs/project/add-department-dialog/add-department-dialog.component';
import { InspectJobApplicationsDialogComponent } from './dialogs/project/inspect-job-applications-dialog/inspect-job-applications-dialog.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {FlexModule} from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { CreateProjectDialogComponent } from './dialogs/user/create-project-dialog/create-project-dialog.component';
import { CreateDepartmentsComponent } from './dialogs/helpers/create-departments/create-departments.component';
import { UrlEditComponent } from './dialogs/helpers/url-edit/url-edit.component';
import { SkillEditComponent } from './dialogs/helpers/skill-edit/skill-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    ProjectSiteComponent,
    SearchComponent,
    HomeComponent,
    SignInComponent,
    EditUserInfoDialogComponent,
    EditUserInfoDialogComponent,
    EditProjectInfoDialogComponent,
    CreateJobPostingDialogComponent,
    DepartmentInputComponent,
    CreateInvitationDialogComponent,
    ProjectSelectionComponent,
    AddDepartmentDialogComponent,
    InspectJobApplicationsDialogComponent,
    MainNavComponent,
    RegisterComponent,
    CreateProjectDialogComponent,
    CreateDepartmentsComponent,
    UrlEditComponent,
    SkillEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    FlexModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
