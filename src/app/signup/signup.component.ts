import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public firstName: string;
  lastName: string;
  email: string;
  password: string;
  

  isSignUpFailed: boolean = false;
  isSuccesfull: boolean = false;
  errorMessage: string = '';

  hide = true;

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.signupUser(this.firstName, this.lastName, this.email, this.password)
      .pipe(
        catchError(err => {
          this.errorMessage = err.error;
          this.isSignUpFailed = true;
          this.dialog.open(ErrorDialogComponent, {
            data: {message: this.errorMessage},
          });
          throw(err);
        })
      )
      .subscribe(response => {
        this.isSignUpFailed = false;
        this.isSuccesfull = true;
        console.log('response =>', response)
      })
  }
}
