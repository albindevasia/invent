import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginGuard} from  '../app/auth/login.guard'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly router:Router,private loggedIn:LoginGuard){}


  title = 'training';
  public log(){
  const logOut = localStorage.getItem('loggedIn');

 
  if (logOut) {
    localStorage.removeItem('loggedIn');
  }

  this.router.navigate(['/home'])

} 
}
