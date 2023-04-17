import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './Authentification/login.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { GuardGuard } from './Authentification/guard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './load/login/login.component';
import { RegisterComponent } from './load/register/register.component';
import { SimpleProductComponent } from './modules/dashboard/products/simple-product/simple-product.component';
import { UploadComponent } from './upload/upload.component';



const routes: Routes = [
  {
    path:'home',
    component: HomeComponent,
    
  },
{
  path:'',
  redirectTo:'load',pathMatch:'full'
},
  {
    path:'load',
    loadChildren:()=>import('./load/load.module').then(m=>m.LoadModule),
    canActivate:[LoginGuard]
  },

  {
    path:'dashboard',
    // component:DashboardComponent,\
    loadChildren:()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule), canActivate:[GuardGuard]
    // canActivate:[GuardGuard]
  },
                                   
  // {
  //   path:'dash',
  //   // component:DashboardComponent,\
  //   loadChildren:()=>import('./dash/dash.module').then(m=>m.DashModule), canActivate:[GuardGuard]
  //   // canActivate:[GuardGuard]
  // },
  {
    path:'register',
    component:RegisterComponent
  },
  

  {
    path:'product/:productId',
    component:SimpleProductComponent

  },
  {
    path:'upload',
    component:UploadComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[LoginGuard,GuardGuard],
})
export class AppRoutingModule { }
