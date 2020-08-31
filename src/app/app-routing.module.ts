import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ProjectSiteComponent} from './project-site/project-site.component';
import {SearchComponent} from './search/search.component';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: 'user/:id', component: UserProfileComponent},
  {path: 'project/:id', component: ProjectSiteComponent},
  {path: 'search', component: SearchComponent},
  {path: '', component: HomeComponent},
  {path: 'login', component: SignInComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
