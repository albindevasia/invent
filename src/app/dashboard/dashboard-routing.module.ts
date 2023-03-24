import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '../clients/clients.component';
import { ProductsComponent } from '../products/products.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SalesComponent } from '../sales/sales.component';


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
    },
    {
      path:'',redirectTo:'products',pathMatch:'full'
    },
    {
      path:'sales',
      component:SalesComponent
    }
   ]
 
   }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}
