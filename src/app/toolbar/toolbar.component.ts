import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isLogin: boolean = false;
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$
      .subscribe(res =>{
        this.isLogin = res
        console.log(this.isLogin)
        if(this.isLogin){
          console.log(localStorage.getItem('auth-user'))
        }
      });
  }
}
