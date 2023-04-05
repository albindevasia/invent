import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '../clients/clients.component';
import { ProductsComponent } from '../products/products.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SalesComponent } from '../sales/sales.component';
import { SaleComponent } from '../sale/sale.component';

import { NewSaleComponent } from '../new-sale/new-sale.component';
import { OverviewComponent } from '../overview/overview.component';
import { LoginGuard } from '../auth/login.guard';
import { SaleTableComponent } from '../sale-table/sale-table.component';
import { QuicksaleComponent } from '../quicksale/quicksale.component';
import { ViewQuickComponent } from '../view-quick/view-quick.component';



const routes: Routes = [
  {path:'',component:DashboardComponent,
   canActivateChild: [LoginGuard],
   children:[
 {
  path:'',
  component:OverviewComponent
 },

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
      component:SalesComponent,
      children:[
        {
        path:'saleTable',
        component:SaleTableComponent,
        },
        {
          path:'quicksale',
          component:QuicksaleComponent
        },
        {
          path:'',
            redirectTo:'saleTable',pathMatch:'full'
        },
        {
          path:'newsale',
          component:NewSaleComponent
        },
        {
          path:'saleTable/:id',
          component:SaleComponent
        },
        {
          path:'quicksale/:id',
          component:ViewQuickComponent
        },
        
      ]
    },
  

   ]
 
   }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}
