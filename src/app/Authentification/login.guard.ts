import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoginService } from '../core/Http/Api/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly loginService:LoginService,
    private router:Router
  ) {}

  public getAuth(){
    this.loginService.getAuthr().subscribe({
      next:()=>{},
      error:()=>{
        this.router.navigate(['/load/login']);
        return false
      },
      complete:()=>true
    });
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):any {
   this.getAuth()
  }
  canActivateChild(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):any{
    this.getAuth()
  }
} 