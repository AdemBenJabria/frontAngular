import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AssignementsComponent } from './assignements/assignements.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from "@angular/material/select";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule} from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AssignementDetailComponent } from './assignements/assignement-detail/assignement-detail.component';
import { AddAssignementComponent } from './assignements/add-assignement/add-assignement.component';
import { EditAssignementComponent } from './edit-assignement/edit-assignement.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthInterceptorInterceptor } from './shared/auth-interceptor.interceptor';
import { MatSortModule } from '@angular/material/sort';
import { StatusTagComponent } from './status-tag/status-tag.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignementsComponent,
    RenduDirective,
    ToolbarComponent,
    SidenavComponent,
    AssignementDetailComponent,
    AddAssignementComponent,
    EditAssignementComponent,
    LoginComponent,
    SignupComponent,
    ErrorDialogComponent,
    HomePageComponent,
    StatusTagComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatChipsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
