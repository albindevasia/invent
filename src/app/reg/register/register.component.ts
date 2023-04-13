import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  
})
export class RegisterComponent {
constructor(private readonly router:Router,private readonly http:HttpClient,private readonly toastr:ToastrService){}

public registerForm=new FormGroup({
  id:new FormControl(0),
  first_name:new FormControl('',Validators.required),
  last_name:new FormControl('',Validators.required),
  email:new FormControl('',Validators.required),
  password:new FormControl('',Validators.required)
})
public get controls(){
  return this.registerForm.controls;


}

public register(){
  // const url:string='https://63be80d8585bedcb36aecdeb.mockapi.io/user'

  // this.http.post(url,this.registerForm.value).subscribe(response=>{
  //   if(response){
  //     this.router.navigate(['/login']);
  //   }
  // })

 const Url:string='https://api-sales-app.josetovar.dev/users'

 
 this.http.post(Url,this.registerForm.value).subscribe(response=>{
  if(response){
  
    this.toastr.success('Registered the new User')
    this.router.navigate(['/load/login']);
  }
})

}
public canCel(){
  this.toastr.error('Not registered any user')
}



}
