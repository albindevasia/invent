import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginGuard} from  '../app/auth/login.guard'
import { LoginComponent } from './load/login/login.component';
import { GuardGuard } from './services/guard.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly router:Router,public loggedIn:LoginGuard,
){}


  title = 'training';

  public logOut(){

  const logOt = localStorage.getItem('access_token');

 
  if (logOt) {
    localStorage.removeItem('access_token');
  }

  this.router.navigate([''])




}

}