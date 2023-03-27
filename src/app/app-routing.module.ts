import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssignementComponent } from './assignements/add-assignement/add-assignement.component';
import { AssignementDetailComponent } from './assignements/assignement-detail/assignement-detail.component';
import { AssignementsComponent } from './assignements/assignements.component';
import { EditAssignementComponent } from './edit-assignement/edit-assignement.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { NotLoggedInGuard } from './shared/not-logged-in.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '', 
    component: HomePageComponent,
  },
  {
    path: 'assignements', 
    component: AssignementsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add', 
    component: AddAssignementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assignement/:id', 
    component: AssignementDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assignement/:id/edit', 
    component: EditAssignementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NotLoggedInGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
