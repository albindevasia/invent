import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly apiService:ApiService,
    private router:Router
  ) {}

  public getAuth(){
    this.apiService.getAuthr().subscribe({
      next:()=>{},
      error:()=>{
        this.router.navigateByUrl('/load/login');
        return false
      },
      complete:()=>true
    });
  }

  canActivate():any {
   this.getAuth()
  }
  canActivateChild():any{
    this.getAuth()
  }
} 