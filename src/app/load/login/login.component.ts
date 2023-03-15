import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent {

  constructor(private readonly router:Router,private readonly http:HttpClient){}

  public loginForm=new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
  });
 
  
 

 
public login(){
  const url:string='https://api-sales-app.josetovar.dev/login'
  const body=this.loginForm.value;



this.http.post(url,body).subscribe((response:any)=>{

  // if(response){



  
 
  //   localStorage.setItem('loggedIn', 'true');
  //   this.router.navigate(['/dashboard'])
    
  // }

  if(response){
    console.log(response)
    localStorage.setItem(
      'access_token',
      JSON.stringify(response.access_token)
      
    );
    this.router.navigate(['lazy/dashboard'])
  }

})

}

  // public login(){
  //   const{email,password}=this.loginForm.value;
  //   Users.map((user) => {
  //     if (user.email === email && user.password === password) {
  //       localStorage.setItem('loggedIn', 'true');
  //       this.router.navigate(['/dashboard']);
  //     }
  //   });
  // }
  public get controls() {
    return this.loginForm.controls;
  }


public sayHi() {
  console.log('Hello!');
}

ngOnDestroy(): void {
  console.log('My component has been close or destroyed');
}
  
}
