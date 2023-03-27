import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { AuthService } from '../shared/auth.service';
import { TokenStorageService } from '../shared/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  hide = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.logIn(this.loginForm.value)
      .pipe(
        catchError(err => {
          if(err.status === 404) {
            this.dialog.open(ErrorDialogComponent, {
              data: {message: err.error},
            });
          }
          return of(err);
        })
      )
      .subscribe(response => {
        console.log('res => ', response);
        this.tokenService.saveToken(response.token, response.expiresIn);
        this.tokenService.saveUser(response.user);
        window.location.reload();
        this.router.navigate(['/']);
      })
  }

}
