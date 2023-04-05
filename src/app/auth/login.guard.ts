import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
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