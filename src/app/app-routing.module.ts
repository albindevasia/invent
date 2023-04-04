import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/login.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardGuard } from './services/guard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './load/login/login.component';
import { RegisterComponent } from './register/register.component';
import { SimpleProductComponent } from './simple-product/simple-product.component';



const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    
  },

  {
    path:'load',
    loadChildren:()=>import('./load/load.module').then(m=>m.LoadModule),
    canActivate:[LoginGuard]
  },

  {
    path:'dashboard',
    // component:DashboardComponent,\
    loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule), canActivate:[GuardGuard]
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
