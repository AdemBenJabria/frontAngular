import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  isLogin = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$
      .subscribe(res => this.isLogin = res);
  }
}
