import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '../clients/clients.component';
import { ProductsComponent } from '../products/products.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


const routes: Routes = [
  {path:'',component:DashboardComponent,

   children:[


    {
    path:'products',
    component:ProductsComponent
    },
    {
      path:'clients',
      component:ClientsComponent
    }
   ]
 
   }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}
