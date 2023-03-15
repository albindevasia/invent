import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/login.guard';
import { DashboardComponent } from './lazy/dashboard/dashboard.component';
import { GuardGuard } from './services/guard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './load/login/login.component';
import { RegisterComponent } from './register/register.component';
import { SimpleProductComponent } from './simple-product/simple-product.component';



const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },

  {
    path:'load',
    loadChildren:()=>import('./load/load.module').then(m=>m.LoadModule),
    canActivate:[LoginGuard]
  },

  {
    path:'lazy',
    // component:DashboardComponent,\
    loadChildren:()=>import('./lazy/lazy.module').then(m=>m.LazyModule),
    // canActivate:[GuardGuard]
  },                                 

  {
    path:'register',
    component: RegisterComponent
  },
  

  {
    path:'product/:productId',
    component:SimpleProductComponent

  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[LoginGuard,GuardGuard],
})
export class AppRoutingModule { }
