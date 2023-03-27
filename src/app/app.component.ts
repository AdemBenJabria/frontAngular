import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { User } from './shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'Application de gestion des devoirs à rendre (Assignements)';
  isLogin: boolean = false;
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$
      .subscribe(res =>{
        this.isLogin = res
        console.log(this.isLogin)
        if(this.isLogin){
          const user: User = (JSON.parse(localStorage.getItem('auth-user') as string));
          this.user = user;
        }
      });
  }

  logOut(): void {
    this.authService.logOut()
    window.location.reload();
  }
}
