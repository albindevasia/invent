import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
 
})



export class LoginComponent {

  constructor(private readonly router:Router,private readonly http:HttpClient,private readonly toastr:ToastrService){}

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

    localStorage.setItem(
      'access_token',
      JSON.stringify(response.access_token)
      
    );
    this.toastr.success('Login successfully completed')
    this.router.navigate(['/dashboard'])
  }else{
    this.toastr.error('Check your email and password')
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
